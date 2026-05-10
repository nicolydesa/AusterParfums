"use client"

import { formatCompactNumber, siteStats } from "@/lib/site-stats"
import { usePublicStats } from "@/components/public-stats-provider"

const labels = ["Perfumes", "Marcas", "Avaliações", "Tópicos"] as const

export function AboutStatsStrip() {
  const { loaded, totalReviews, forumThreadCount } = usePublicStats()

  const values = [
    siteStats.perfumes,
    siteStats.brands,
    loaded ? totalReviews : siteStats.reviews,
    loaded ? forumThreadCount : siteStats.forumPosts,
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {labels.map((label, i) => (
        <div key={label} className="text-center">
          <p className="font-serif text-3xl lg:text-4xl font-semibold text-primary">
            {formatCompactNumber(values[i])}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  )
}
