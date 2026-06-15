const STORAGE_KEY = 'ya-imam-ali:user-id'

/**
 * Returns this browser's anonymous user ID, generating and persisting one on
 * the first call. Used as the primary key in `public.users` so we can hang
 * session summaries off the same identity across visits, without real auth.
 *
 * Real authentication (Supabase Auth) lands later — this hook is the
 * interface boundary; only this file needs to change when that happens.
 */
export function getOrCreateUserId(): string {
  try {
    let id = localStorage.getItem(STORAGE_KEY)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(STORAGE_KEY, id)
    }
    return id
  } catch {
    // Private browsing / SSR / iframe with cookies blocked — fall back to a
    // per-session ID so the chat still works, even though memory won't
    // persist across reloads.
    return crypto.randomUUID()
  }
}
