import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Avatar from '../components/Avatar'
import MessageBubble, { type MessageRole } from '../components/MessageBubble'
import VerseCard from '../components/VerseCard'
import TypingIndicator from '../components/TypingIndicator'
import ChatInput from '../components/ChatInput'
import AppHeader from '../components/AppHeader'
import { useLang } from '../contexts/LangContext'
import { useTSP } from '../contexts/TSPContext'
import { useProfile } from '../contexts/ProfileContext'
import { type EmotionalState } from '../types/paths'
import {
  callClaude,
  streamClaude,
  isOutOfCreditsError,
  type ClaudeMessage,
  type CrisisResource,
  type CrisisInfo,
} from '../lib/claude'
import type { TSP } from '../types/tsp'
import { parseReply, type ParsedVerse } from '../lib/parseReply'
import { getPrompt } from '../lib/prompts'
import { getOrCreateUserId } from '../lib/userId'
import { supabase } from '../lib/supabase'
import { useAudioPlayer } from '../hooks/useAudioPlayer'
import { cleanForTTS } from '../lib/cleanForTTS'
import { T } from '../lib/i18n'
import CrisisCard from '../components/CrisisCard'
import '../components/Chat.css'

type Message = {
  id: number
  role: MessageRole
  text?: string
  verse?: ParsedVerse
  crisisResources?: CrisisResource[]
}

/**
 * Build the text the voice should actually read: the prose plus the verse
 * (Arabic + English) when one is present. The verse card visually shows
 * the same content; speaking it gives the moment its full weight.
 */
function buildSpeakable(text: string, verse?: ParsedVerse): string {
  if (!verse) return text
  const tail = `${verse.arabic}. ${verse.english}`
  return text ? `${text.replace(/\s+$/, '')} … ${tail}` : tail
}

/**
 * What to SHOW while a reply is still streaming in: the prose only. Hide the
 * trailing STATE:::/AVATAR::: metadata and any (in-progress) VERSE::: block —
 * the verse renders as its own card once the full reply has arrived.
 */
function cleanStreaming(raw: string): string {
  let t = raw
  const metaIdx = t.search(/STATE:::|AVATAR:::/)
  if (metaIdx >= 0) t = t.slice(0, metaIdx)
  const verseIdx = t.indexOf('VERSE:::')
  if (verseIdx >= 0) t = t.slice(0, verseIdx)
  return t.replace(/\s+$/, '')
}

export default function Companion() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const { setTSP } = useTSP()
  const { profile } = useProfile()
  const [searchParams, setSearchParams] = useSearchParams()
  const seededMessage = searchParams.get('q')?.trim() ?? ''
  // v15 — one prompt, no path selection. The companion reads what the
  // person needs from how they speak, not from a button they pressed.
  const prompt = getPrompt(lang)

  const userId = useMemo(() => getOrCreateUserId(), [])
  const {
    speaking,
    error: audioError,
    play: playAudio,
    stop,
  } = useAudioPlayer()
  const [state, setState] = useState<EmotionalState>('peace')
  const [avatarVerse, setAvatarVerse] = useState<ParsedVerse | undefined>(
    undefined,
  )
  const [messages, setMessages] = useState<Message[]>([])
  const [history, setHistory] = useState<ClaudeMessage[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>('')

  // v21 §41 — Interaction disclosure. Single fade-in line shown once
  // per session at the moment conversation begins. Fades out after ~4s
  // and does not interrupt the experience.
  const [showDisclosure, setShowDisclosure] = useState(false)
  useEffect(() => {
    const KEY = 'ya-imam-ali:disclosure-shown'
    try {
      if (sessionStorage.getItem(KEY) === '1') return
      sessionStorage.setItem(KEY, '1')
    } catch {
      // ignore storage errors — show once per page load
    }
    setShowDisclosure(true)
    const t = window.setTimeout(() => setShowDisclosure(false), 4500)
    return () => window.clearTimeout(t)
  }, [])

  const nextId = useRef(1)
  const scroller = useRef<HTMLDivElement>(null)
  const initialised = useRef(false)

  // Ref keeps the latest session state available to the unmount cleanup,
  // since the cleanup closure would otherwise see whatever was in scope when
  // the effect first ran (which was an empty transcript).
  const sessionRef = useRef({ history, userId })
  sessionRef.current = { history, userId }

  // On unmount: if the user had a real exchange, ask the summarize function
  // to distil it and persist a row to session_summaries. Fire-and-forget.
  // v15 — no path; we send 'open' as a placeholder so the existing
  // summarize Edge Function (which expects a path string) keeps working.
  useEffect(() => {
    return () => {
      const { history, userId } = sessionRef.current
      if (!userId || history.length < 2) return
      void supabase.functions
        .invoke('summarize', {
          body: { user_id: userId, path: 'open', transcript: history },
        })
        .catch((e) => console.error('[summarize]', e))
    }
  }, [])

  // One streaming turn, shared by the opener, the seeded message, and every
  // handleSend. Streams tokens into a live "ali" bubble, then finalizes
  // (verse card + state + voice). Falls back to non-streaming once on error.
  const streamTurn = useCallback(
    async (opts: {
      send: ClaudeMessage[]
      retrievalQuery?: string
      historyOnDone: (raw: string) => ClaudeMessage[]
      onAfter?: () => void
    }) => {
      if (!prompt) return
      setError('')
      setState('anxiety')
      setBusy(true)

      let aliId: number | null = null
      const showDelta = (full: string) => {
        const display = cleanStreaming(full)
        if (!display) return
        if (aliId === null) {
          const id = (aliId = nextId.current++)
          setMessages((prev) => [...prev, { id, role: 'ali', text: display }])
        } else {
          const id = aliId
          setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, text: display } : m)),
          )
        }
      }

      const finalize = (raw: string, crisis?: CrisisInfo, tsp?: TSP) => {
        if (tsp) setTSP(tsp)
        if (aliId === null) {
          const id = (aliId = nextId.current++)
          setMessages((prev) => [...prev, { id, role: 'ali', text: '' }])
        }
        const id = aliId
        if (crisis?.detected) {
          setState('grief')
          setMessages((prev) =>
            prev.map((m) =>
              m.id === id ? { ...m, text: raw, crisisResources: crisis.resources } : m,
            ),
          )
          return
        }
        const parsed = parseReply(raw)
        setState(parsed.state ?? 'peace')
        if (parsed.avatarVerse) setAvatarVerse(parsed.avatarVerse)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, text: parsed.text, verse: parsed.verse } : m,
          ),
        )
        setHistory(opts.historyOnDone(raw))
        // Replies are no longer auto-voiced (saves ElevenLabs credit) — the
        // user taps "Listen" on a message to hear it. The opener stays voiced.
      }

      try {
        const r = await streamClaude(
          {
            mode: 'companion',
            messages: opts.send,
            lang,
            userId,
            profile,
            retrievalQuery: opts.retrievalQuery,
          },
          (full) => showDelta(full),
        )
        finalize(r.full, r.crisis, r.tsp)
      } catch {
        // Streaming failed (network blip / unsupported) — fall back once.
        try {
          const r = await callClaude({
            mode: 'companion',
            messages: opts.send,
            lang,
            userId,
            profile,
            retrievalQuery: opts.retrievalQuery,
          })
          finalize(r.text, r.crisis, r.tsp)
        } catch (e) {
          const raw = (e as Error).message || String(e)
          if (isOutOfCreditsError(raw))
            console.error('[chat] Anthropic API credits exhausted:', raw)
          if (aliId !== null) {
            const id = aliId
            setMessages((prev) =>
              prev.filter((m) => !(m.id === id && !(m.text && m.text.length))),
            )
          }
          setError(raw)
          setState('peace')
        }
      } finally {
        setBusy(false)
        opts.onAfter?.()
      }
    },
    [prompt, lang, userId, profile, playAudio, setTSP],
  )

  // First load: either greet (no seeded message) or respond directly to the
  // message the user typed on the welcome screen (seeded via ?q=).
  useEffect(() => {
    if (initialised.current || !prompt) return
    initialised.current = true

    // ── Branch A: user came in with a question already in hand
    if (seededMessage) {
      // Show their message immediately so they don't watch a blank screen
      setMessages([
        { id: nextId.current++, role: 'user', text: seededMessage },
      ])
      // Drop ?q= once the turn finishes so a refresh doesn't replay the seed.
      void streamTurn({
        send: [{ role: 'user', content: seededMessage }],
        retrievalQuery: seededMessage,
        historyOnDone: (raw) => [
          { role: 'user', content: seededMessage },
          { role: 'assistant', content: raw },
        ],
        onAfter: () => setSearchParams({}, { replace: true }),
      })
      return
    }

    // ── Branch B: the opener is a FIXED welcome. Render it directly instead
    // of spending a full (~200K-token corpus) LLM call just to reproduce a
    // fixed greeting — instant for the user, and free. History is seeded so
    // the next message continues the conversation naturally.
    const greeting = T.openerGreeting[lang]
    setMessages([{ id: nextId.current++, role: 'ali', text: greeting }])
    setState('peace')
    setHistory([
      { role: 'user', content: prompt.opener },
      { role: 'assistant', content: greeting },
    ])
    // Voice is user-initiated only — tap "Listen" on any message to hear it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt])

  // Auto-scroll on new content
  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, busy])

  if (!prompt) {
    return (
      <>
        <main style={{ padding: 24, color: 'var(--text)' }}>
          {T.unknownPath[lang]}{' '}
          <button onClick={() => navigate('/')}>{T.goBack[lang]}</button>
        </main>
      </>
    )
  }

  function handleSend(text: string) {
    if (!prompt) return
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: 'user', text },
    ])
    const nextHistory: ClaudeMessage[] = [
      ...history,
      { role: 'user', content: text },
    ]
    void streamTurn({
      send: nextHistory,
      retrievalQuery: text,
      historyOnDone: (raw) => [...nextHistory, { role: 'assistant', content: raw }],
    })
  }

  return (
    <>
    <AppHeader isSubPage />
    <main
      style={{
        height: 'calc(100dvh - var(--header-h, 57px) - env(safe-area-inset-top))',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        color: 'var(--text)',
        maxWidth: 520,
        margin: '0 auto',
        overflow: 'hidden',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >

      {/* v44 §73 — the chat avatar is the cinematic scholar portrait.
          State-coloured glow, breathing pulse, and speaking animation
          still apply via the Avatar shell. */}
      <Avatar
        state={state}
        verse={avatarVerse}
        speaking={speaking}
        imageSrc="/scholar.jpg"
      />

      {/* v21 §41 — Interaction disclosure. Fades in once per session at
          the moment conversation begins, fades out after ~4s. Theological
          context without breaking the sacred experience. */}
      <div
        aria-live="polite"
        style={{
          maxHeight: showDisclosure ? 100 : 0,
          opacity: showDisclosure ? 1 : 0,
          padding: showDisclosure ? '8px 18px 4px' : '0 18px',
          margin: 0,
          fontSize: 10,
          lineHeight: 1.55,
          color: 'var(--gold)',
          fontStyle: 'italic',
          textAlign: 'center',
          transition: 'max-height 1.4s ease, opacity 1.4s ease, padding 1.4s ease',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {T.interactionDisclosure[lang]}
      </div>

      <div className="chat" ref={scroller}>
        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} text={m.text}>
            {m.verse && (
              <VerseCard
                arabic={m.verse.arabic}
                english={m.verse.english}
                source={m.verse.source}
              />
            )}
            {m.crisisResources && (
              <CrisisCard resources={m.crisisResources} />
            )}
            {m.role === 'ali' && (m.text ?? '').trim() && (
              <button
                onClick={() =>
                  void playAudio(
                    cleanForTTS(buildSpeakable(m.text ?? '', m.verse), lang),
                    lang,
                  )
                }
                aria-label={lang === 'ar' ? 'استمع' : 'Listen'}
                style={{
                  marginTop: 8,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '5px 12px',
                  borderRadius: 999,
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  color: 'var(--gold)',
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                🔊 {lang === 'ar' ? 'استمع' : 'Listen'}
              </button>
            )}
          </MessageBubble>
        ))}
        {busy &&
          !(
            messages.length > 0 &&
            messages[messages.length - 1].role === 'ali' &&
            (messages[messages.length - 1].text ?? '').length > 0
          ) && <TypingIndicator />}
        {error && (
          <div
            style={{
              fontSize: 11,
              color: '#cc6644',
              padding: '8px 12px',
              background: 'rgba(120,50,20,0.12)',
              borderRadius: 8,
              border: '1px solid rgba(180,80,30,0.3)',
            }}
          >
            {isOutOfCreditsError(error)
              ? T.outOfCredits[lang]
              : `${T.errorPrefix[lang]}${error}`}
          </div>
        )}
        {audioError && (
          <div
            style={{
              fontSize: 10,
              color: '#aa6b3a',
              padding: '6px 10px',
              background: 'rgba(217, 119, 66, 0.10)',
              borderRadius: 6,
              border: '1px solid rgba(217, 119, 66, 0.25)',
              fontStyle: 'italic',
            }}
          >
            🔊 Voice unavailable — {audioError}
          </div>
        )}
      </div>

      {/* Stop button — visible while audio is playing so user can always halt it */}
      {speaking && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
          <button
            onClick={() => stop()}
            aria-label={lang === 'ar' ? 'إيقاف الصوت' : 'Stop voice'}
            style={{
              padding: '5px 16px',
              borderRadius: 999,
              border: '1px solid var(--border)',
              background: 'rgba(12,26,58,0.7)',
              color: 'var(--gold)',
              cursor: 'pointer',
              fontSize: 11,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            ◼ {lang === 'ar' ? 'إيقاف' : 'Stop'}
          </button>
        </div>
      )}
      <ChatInput
        disabled={busy}
        onSend={handleSend}
        lang={lang}
        placeholder={T.chatPlaceholder[lang]}
      />
    </main>
    </>
  )
}
