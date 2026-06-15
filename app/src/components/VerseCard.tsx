import { useLang } from '../contexts/LangContext'
import { useTSP } from '../contexts/TSPContext'
import { T } from '../lib/i18n'
import { resolveAttributionStyle } from '../types/tsp'
import { applyAttributionStyle } from '../lib/tsp/attribution'

type Props = {
  arabic: string
  english: string
  source: string
}

export default function VerseCard({ arabic, english, source }: Props) {
  const { lang } = useLang()
  const { tsp } = useTSP()
  // v24 §49.2 — rewrite the honorific on the source line to match the
  // user's tradition register. Content of the teaching is untouched.
  const styledSource = applyAttributionStyle(source, resolveAttributionStyle(tsp))
  return (
    <div className="verse-card">
      <div className="v-label">{T.verseLabel[lang]}</div>
      <span className="v-ar">{arabic}</span>
      <span className="v-en">{english}</span>
      <span className="v-src">{styledSource}</span>
    </div>
  )
}
