import type { Lang } from '../types/lang'

const STORAGE_KEY = 'ya-imam-ali:lang'

export function getStoredLang(): Lang | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'en' || v === 'ar') return v
    return null
  } catch {
    return null
  }
}

export function setStoredLang(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // ignore
  }
}
