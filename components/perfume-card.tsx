"use client"

import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { isFavorite, toggleFavorite } from "@/lib/user-store"
import { usePerfumePublicStats } from "@/components/public-stats-provider"

interface PerfumeCardProps {
  id: string
  name: string
  brand: string
  image: string
  rating: number
  reviewCount: number
  topNotes: string[]
  year?: number
}

export function PerfumeCard({ id, name, brand, image, rating, reviewCount, topNotes, year }: PerfumeCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const { displayRating, displayReviewCount } = usePerfumePublicStats(id, rating, reviewCount)

  useEffect(() => {
    setIsLiked(isFavorite(id))
  }, [id])

  return (
    <article className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square bg-muted p-6">
        <img
          src={image}
          alt={`${name} by ${brand}`}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card ${
            isLiked ? "text-red-500" : "text-muted-foreground"
          }`}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            const nextFavorites = toggleFavorite(id)
            setIsLiked(nextFavorites.includes(id))
          }}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          <span className="sr-only">Adicionar à lista de desejos</span>
        </Button>
        {year && (
          <span className="absolute bottom-3 left-3 px-2 py-1 text-xs font-medium bg-card/80 backdrop-blur-sm rounded-md text-muted-foreground">
            {year}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-medium text-primary uppercase tracking-wide">{brand}</p>
        <h3 className="mt-1 font-serif text-lg font-medium text-foreground line-clamp-1">{name}</h3>
        
        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-foreground">{displayRating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">({displayReviewCount.toLocaleString()} avaliações)</span>
        </div>

        {/* Top Notes */}
        <div className="mt-3 flex flex-wrap gap-1">
          {topNotes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full"
            >
              {note}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
