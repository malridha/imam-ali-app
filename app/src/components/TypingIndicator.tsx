import { useLang } from '../contexts/LangContext'
import { T } from '../lib/i18n'

export default function TypingIndicator() {
  const { lang } = useLang()
  return (
    <div className="typing-wrap">
      <div className="msg-who" style={{ color: 'var(--dim)' }}>
        {T.whoAli[lang]}
      </div>
      <div className="typing-bub">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}
