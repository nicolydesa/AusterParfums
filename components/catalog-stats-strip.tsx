"use client"

import { formatCompactNumber, siteStats } from "@/lib/site-stats"
import { usePublicStats } from "@/components/public-stats-provider"

export function CatalogStatsStrip() {
  const { loaded, totalReviews } = usePublicStats()
  const reviewDisplay = loaded ? totalReviews : siteStats.reviews

  return (
    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="text-center">
        <p className="font-serif text-4xl font-bold text-foreground">{formatCompactNumber(siteStats.perfumes)}</p>
        <p className="text-sm text-muted-foreground">Fragrâncias</p>
      </div>
      <div className="text-center">
        <p className="font-serif text-4xl font-bold text-foreground">{formatCompactNumber(reviewDisplay)}</p>
        <p className="text-sm text-muted-foreground">Avaliações</p>
      </div>
      <div className="text-center">
        <p className="font-serif text-4xl font-bold text-foreground">{formatCompactNumber(siteStats.brands)}</p>
        <p className="text-sm text-muted-foreground">Marcas</p>
      </div>
      <div className="text-center">
        <p className="font-serif text-4xl font-bold text-foreground">{formatCompactNumber(siteStats.notes)}</p>
        <p className="text-sm text-muted-foreground">Notas</p>
      </div>
    </div>
  )
}
