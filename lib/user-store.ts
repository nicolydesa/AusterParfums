"use client"

const FAVORITES_KEY = "verdara:favorites"

function canUseStorage() {
  return typeof window !== "undefined"
}

function readJSON<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback
  const raw = window.localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJSON<T>(key: string, value: T) {
  if (!canUseStorage()) return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getFavorites(): string[] {
  return readJSON<string[]>(FAVORITES_KEY, [])
}

export function isFavorite(perfumeId: string): boolean {
  return getFavorites().includes(perfumeId)
}

export function toggleFavorite(perfumeId: string): string[] {
  const favorites = getFavorites()
  const nextFavorites = favorites.includes(perfumeId)
    ? favorites.filter((id) => id !== perfumeId)
    : [...favorites, perfumeId]

  writeJSON(FAVORITES_KEY, nextFavorites)
  if (canUseStorage()) {
    window.dispatchEvent(new Event("favorites-updated"))
  }
  return nextFavorites
}
