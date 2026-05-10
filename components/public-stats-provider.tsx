"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { PublicStatsPayload } from "@/lib/public-stats-types"

type PublicStatsContextValue = PublicStatsPayload & {
  loaded: boolean
  refresh: () => Promise<void>
}

const defaultValue: PublicStatsContextValue = {
  loaded: false,
  totalReviews: 0,
  byPerfumeId: {},
  forumThreadCount: 0,
  refresh: async () => {},
}

const PublicStatsContext = createContext<PublicStatsContextValue>(defaultValue)

export function PublicStatsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PublicStatsPayload>({
    totalReviews: 0,
    byPerfumeId: {},
    forumThreadCount: 0,
  })
  const [loaded, setLoaded] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/public-stats")
      const json = (await res.json()) as PublicStatsPayload
      setData({
        totalReviews: json.totalReviews ?? 0,
        byPerfumeId: json.byPerfumeId ?? {},
        forumThreadCount: json.forumThreadCount ?? 0,
      })
    } catch {
      /* keep previous */
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const value = useMemo<PublicStatsContextValue>(
    () => ({
      ...data,
      loaded,
      refresh,
    }),
    [data, loaded, refresh],
  )

  return <PublicStatsContext.Provider value={value}>{children}</PublicStatsContext.Provider>
}

export function usePublicStats() {
  return useContext(PublicStatsContext)
}

export function usePerfumePublicStats(perfumeId: string, catalogRating: number, catalogReviewCount: number) {
  const { loaded, byPerfumeId } = usePublicStats()
  const agg = byPerfumeId[perfumeId]
  const hasCommunity = Boolean(agg && agg.count > 0)
  return {
    displayRating: hasCommunity ? agg!.avgRating : catalogRating,
    displayReviewCount: hasCommunity ? agg!.count : catalogReviewCount,
    usesCommunity: loaded && hasCommunity,
  }
}
