'use client'

import { useSyncExternalStore } from 'react'

function getSnapshot(query: string) {
  if (typeof window === 'undefined') return false
  return window.matchMedia(query).matches
}

function getServerSnapshot() {
  return false
}

function subscribe(query: string, callback: () => void) {
  const mql = window.matchMedia(query)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => subscribe(query, cb),
    () => getSnapshot(query),
    getServerSnapshot,
  )
}
