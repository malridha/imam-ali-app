import { supabase } from './supabase'
import type { PathKey } from '../types/paths'

const KNOWN_PATHS = new Set<PathKey>(['wisdom', 'poetry', 'venting', 'counsel'])

/**
 * Sends a free-text user message to the classify-path Edge Function and
 * returns the best-fit path. Always resolves with a valid PathKey, even
 * if the server falls back to 'counsel' on errors.
 */
export async function classifyPath(query: string): Promise<PathKey> {
  const { data, error } = await supabase.functions.invoke<{ path?: PathKey }>(
    'classify-path',
    { body: { query } },
  )
  if (error) throw new Error(error.message || 'Could not route your message')
  const path = data?.path
  if (!path || !KNOWN_PATHS.has(path)) return 'counsel'
  return path
}
