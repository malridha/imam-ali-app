import type { ReactNode } from 'react'
import { useLang } from '../contexts/LangContext'
import { T } from '../lib/i18n'

export type MessageRole = 'user' | 'ali'

type Props = {
  role: MessageRole
  text?: string
  children?: ReactNode
}

export default function MessageBubble({ role, text, children }: Props) {
  const { lang } = useLang()
  const label = role === 'user' ? T.whoYou[lang] : T.whoAli[lang]

  return (
    <div className={`msg ${role}`}>
      <div className="msg-who">{label}</div>
      <div className="bub">
        {children}
        {text && <div>{text}</div>}
      </div>
    </div>
  )
}
