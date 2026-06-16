// Arabic recitation comparison.
//
// Browser speech recognition returns an *approximate*, undiacritized
// transcription of what the user said. To give useful "did you recite the
// right words?" feedback we normalize both the expected text and the heard
// text to a common form, then align them word-by-word (order-aware) so we
// can mark which expected words were matched and which were missed.
//
// This is a WORD-ACCURACY check, NOT a tajweed/pronunciation grader — the
// browser API can't judge articulation, elongation, or makharij. It is
// honest about that limit: it helps a learner get the *words* right.

/**
 * Collapse an Arabic string to a comparison form: strip diacritics, tatweel,
 * and Qur'anic annotation marks; unify letter variants that speech
 * recognition tends to flatten (alef forms, alef maqsura, ta marbuta,
 * hamza carriers); and drop anything that isn't an Arabic letter or space.
 */
export function normalizeArabic(input: string): string {
  return input
    .normalize('NFC')
    // harakat, tanwin, shadda, sukun, superscript alef
    .replace(/[ً-ْٰ]/g, '')
    // tatweel (kashida)
    .replace(/ـ/g, '')
    // small high/low Qur'anic marks
    .replace(/[ؐ-ؚۖ-ۭ]/g, '')
    // alef variants → bare alef
    .replace(/[آأإٱ]/g, 'ا')
    // alef maqsura → ya
    .replace(/ى/g, 'ي')
    // ta marbuta → ha (recognizers commonly hear/emit ha)
    .replace(/ة/g, 'ه')
    // hamza carriers → base letters
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ء/g, '')
    // anything not Arabic letter or whitespace → space
    .replace(/[^ا-ي\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeWord(w: string): string {
  return normalizeArabic(w)
}

export type WordResult = {
  /** The original (diacritized) expected word, for display. */
  word: string
  /** Whether this expected word was matched in what the user recited. */
  ok: boolean
}

export type RecitationScore = {
  /** Expected words in order, each flagged matched/missed. */
  words: WordResult[]
  matched: number
  total: number
  /** 0..1 share of expected words matched. */
  accuracy: number
}

/**
 * Order-aware word alignment via longest-common-subsequence. Words that lie
 * on the LCS of (expected, heard) are "matched"; the rest are "missed".
 * Display uses the original expected words; matching uses normalized forms.
 */
export function scoreRecitation(expected: string, heard: string): RecitationScore {
  const expOrig = expected.trim().split(/\s+/).filter(Boolean)
  // Keep original↔normalized pairs, dropping tokens that normalize to empty
  // (e.g. standalone punctuation) so indices stay meaningful.
  const exp: { orig: string; norm: string }[] = []
  for (const o of expOrig) {
    const n = normalizeWord(o)
    if (n) exp.push({ orig: o, norm: n })
  }
  const got = normalizeArabic(heard).split(' ').filter(Boolean)

  const n = exp.length
  const m = got.length
  if (n === 0) {
    return { words: [], matched: 0, total: 0, accuracy: 0 }
  }

  // LCS DP over normalized tokens.
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array<number>(m + 1).fill(0),
  )
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] =
        exp[i - 1].norm === got[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1])
    }
  }

  // Backtrack to mark which expected indices are on the LCS.
  const matchedIdx = new Set<number>()
  let i = n
  let j = m
  while (i > 0 && j > 0) {
    if (exp[i - 1].norm === got[j - 1]) {
      matchedIdx.add(i - 1)
      i--
      j--
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--
    } else {
      j--
    }
  }

  const words: WordResult[] = exp.map((e, idx) => ({
    word: e.orig,
    ok: matchedIdx.has(idx),
  }))
  const matched = matchedIdx.size
  return { words, matched, total: n, accuracy: matched / n }
}

/**
 * Split a du'a's Arabic into recitable phrases. Prefer explicit line breaks;
 * otherwise break on sentence/clause punctuation. Short du'as stay whole.
 */
export function splitIntoPhrases(arabic: string): string[] {
  const byLine = arabic
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean)
  const source = byLine.length > 1 ? byLine : [arabic.trim()]

  const phrases: string[] = []
  for (const block of source) {
    // Split on full stops and common clause separators, keeping it readable.
    const parts = block
      .split(/(?<=[۔.!؟])\s+|\s*[،؛]\s+/)
      .map((s) => s.trim())
      .filter(Boolean)
    for (const p of parts) phrases.push(p)
  }
  return phrases.length ? phrases : [arabic.trim()]
}
