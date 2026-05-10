"use client"

import { useState, useMemo, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PerfumeCard } from "@/components/perfume-card"
import { perfumes } from "@/lib/data"
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { getPerfumeImage } from "@/lib/perfume-images"

const genderFilters = [
  { value: "all", label: "Todos os gêneros" },
  { value: "men", label: "Masculino" },
  { value: "women", label: "Feminino" },
  { value: "unisex", label: "Unisex" },
]

const sortOptions = [
  { value: "popular", label: "Mais populares" },
  { value: "top-rated", label: "Mais bem avaliados" },
  { value: "newest", label: "Mais recentes" },
  { value: "oldest", label: "Mais antigos" },
  { value: "name-asc", label: "Nome A-Z" },
  { value: "name-desc", label: "Nome Z-A" },
]

export default function PerfumesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [genderFilter, setGenderFilter] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSearchQuery(params.get("q") ?? "")
  }, [])

  const filteredPerfumes = useMemo(() => {
    let result = [...perfumes]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.topNotes.some((n) => n.toLowerCase().includes(query)) ||
          p.accords.some((a) => a.toLowerCase().includes(query))
      )
    }

    // Gender filter
    if (genderFilter !== "all") {
      result = result.filter((p) => p.gender === genderFilter)
    }

    // Sort
    switch (sortBy) {
      case "top-rated":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result.sort((a, b) => b.year - a.year)
        break
      case "oldest":
        result.sort((a, b) => a.year - b.year)
        break
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount)
    }

    return result
  }, [searchQuery, genderFilter, sortBy])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-secondary py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
              Explorar perfumes
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-pretty">
              Descubra seu proximo perfume assinatura na nossa coleção de diversas fragrâncias.
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="border-b border-border bg-card sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar perfumes, marcas e notas..."
                  className="pl-10 bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Gender Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      {genderFilters.find((g) => g.value === genderFilter)?.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {genderFilters.map((filter) => (
                      <DropdownMenuItem
                        key={filter.value}
                        onClick={() => setGenderFilter(filter.value)}
                      >
                        {filter.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Sort */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      {sortOptions.find((s) => s.value === sortBy)?.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* More Filters */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                  className="hidden sm:flex"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Mais filtros</span>
                </Button>
              </div>
            </div>

            {/* Results count */}
            <p className="mt-4 text-sm text-muted-foreground">
              Mostrando {filteredPerfumes.length} perfumes
            </p>
          </div>
        </div>

        {/* Perfume Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {filteredPerfumes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {filteredPerfumes.map((perfume) => (
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
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Nenhum perfume encontrado para esses filtros.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setGenderFilter("all")
                  setSortBy("popular")
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
