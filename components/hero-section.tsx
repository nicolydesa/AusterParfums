"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { formatCompactNumber, siteStats } from "@/lib/site-stats"
import { usePublicStats } from "@/components/public-stats-provider"
import { useRouter } from "next/navigation"

const popularSearches = ["Rose", "Oud", "Vanilla", "Musk", "Citrus", "Woody"]

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { loaded, totalReviews } = usePublicStats()
  const reviewDisplay = loaded ? totalReviews : siteStats.reviews

  const handleSearch = () => {
    const query = searchQuery.trim()
    if (!query) {
      router.push("/perfumes")
      return
    }
    router.push(`/perfumes?q=${encodeURIComponent(query)}`)
  }

  return (
    <section className="relative overflow-hidden bg-secondary py-20 lg:py-32">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight text-balance">
            Descubra seu
            <span className="block text-primary">Perfume Assinatura</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore diversas fragrâncias com as mais diversas marcass. Leia avaliações, compare notas
            e encontre a fragrância que combina com você.
          </p>

          {/* Search Bar */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Busque perfumes, marcas ou notas..."
                  className="pl-12 h-14 bg-card border-border text-base rounded-xl shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch()
                    }
                  }}
                />
              </div>
              <Button
                size="lg"
                className="h-14 px-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleSearch}
              >
                Buscar
              </Button>
            </div>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">Populares:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term)
                    router.push(`/perfumes?q=${encodeURIComponent(term)}`)
                  }}
                  className="px-3 py-1 text-sm bg-card hover:bg-muted rounded-full border border-border text-foreground transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div>
              <p className="font-serif text-3xl font-semibold text-foreground">{formatCompactNumber(siteStats.perfumes)}</p>
              <p className="text-sm text-muted-foreground mt-1">Perfumes</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold text-foreground">{formatCompactNumber(siteStats.brands)}</p>
              <p className="text-sm text-muted-foreground mt-1">Marcas</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold text-foreground">{formatCompactNumber(reviewDisplay)}</p>
              <p className="text-sm text-muted-foreground mt-1">Avaliações</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
