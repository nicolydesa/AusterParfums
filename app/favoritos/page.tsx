"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PerfumeCard } from "@/components/perfume-card"
import { Button } from "@/components/ui/button"
import { perfumes } from "@/lib/data"
import { getPerfumeImage } from "@/lib/perfume-images"
import { getFavorites } from "@/lib/user-store"
import { Heart } from "lucide-react"

export default function FavoritosPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  useEffect(() => {
    setFavoriteIds(getFavorites())
    const onStorage = () => setFavoriteIds(getFavorites())
    const onFavoritesUpdated = () => setFavoriteIds(getFavorites())
    window.addEventListener("storage", onStorage)
    window.addEventListener("favorites-updated", onFavoritesUpdated)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("favorites-updated", onFavoritesUpdated)
    }
  }, [])

  const favoritePerfumes = useMemo(
    () => perfumes.filter((perfume) => favoriteIds.includes(perfume.id)),
    [favoriteIds]
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="bg-secondary py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-primary" />
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">Favoritos</h1>
            </div>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Salve aqui os perfumes que mais gostou para comparar depois.
            </p>
          </div>
        </section>

        <section className="py-10 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {favoritePerfumes.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground">Você tem {favoritePerfumes.length} perfume(s) nos favoritos.</p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                  {favoritePerfumes.map((perfume) => (
                    <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
                      <PerfumeCard
                        id={perfume.id}
                        name={perfume.name}
                        brand={perfume.brand}
                        image={getPerfumeImage(perfume)}
                        rating={perfume.rating}
                        reviewCount={perfume.reviewCount}
                        topNotes={perfume.topNotes}
                        year={perfume.year}
                      />
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-border bg-card p-8 sm:p-10 text-center">
                <p className="text-lg text-foreground">Sua lista de favoritos está vazia.</p>
                <p className="mt-2 text-muted-foreground">Clique no coração dos cards para adicionar perfumes aqui.</p>
                <Button asChild className="mt-6">
                  <Link href="/perfumes">Explorar perfumes</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
