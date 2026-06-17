import { createClient } from '@supabase/supabase-js'

// Public Supabase project values — the ANON (publishable) key and project URL.
// These are safe to ship in the client bundle (they are exposed there no matter
// what, and data is protected by row-level security; the secret service_role
// key lives only in Supabase Edge Function secrets, never here). Committed as
// fallbacks so the app always builds and runs even when the host's env vars are
// missing or misconfigured. VITE_* env vars still override them when set.
const FALLBACK_URL = 'https://sunvqtxesfdkrqkulwys.supabase.co'
const FALLBACK_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1bnZxdHhlc2Zka3Jxa3Vsd3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MzQxNjcsImV4cCI6MjA5NDMxMDE2N30.jdzDePSbeERT1OZcMtivJ5C5AbMVaOtHiMUyg12vUHc'

const url = (import.meta.env.VITE_SUPABASE_URL as string) || FALLBACK_URL
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || FALLBACK_ANON_KEY

export const supabase = createClient(url, anonKey)
