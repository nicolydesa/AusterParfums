"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { brands } from "@/lib/data"
import { Search, ChevronDown, MapPin, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const countryFilters = [
  { value: "all", label: "Todos os países" },
  { value: "France", label: "Franca" },
  { value: "Italy", label: "Italia" },
  { value: "United States", label: "Estados Unidos" },
  { value: "Germany", label: "Alemanha" },
  { value: "Venezuela", label: "Venezuela" },
]

const sortOptions = [
  { value: "name-asc", label: "Nome A–Z" },
  { value: "name-desc", label: "Nome Z–A" },
  { value: "perfumes", label: "Mais perfumes" },
  { value: "oldest", label: "Mais antigas" },
  { value: "newest", label: "Mais novas" },
]

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [countryFilter, setCountryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name-asc")

  const filteredBrands = useMemo(() => {
    let result = [...brands]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.country.toLowerCase().includes(query)
      )
    }

    // Country filter
    if (countryFilter !== "all") {
      result = result.filter((b) => b.country === countryFilter)
    }

    // Sort
    switch (sortBy) {
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "perfumes":
        result.sort((a, b) => b.perfumeCount - a.perfumeCount)
        break
      case "oldest":
        result.sort((a, b) => a.founded - b.founded)
        break
      case "newest":
        result.sort((a, b) => b.founded - a.founded)
        break
      default:
        result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [searchQuery, countryFilter, sortBy])

  // Group brands alphabetically
  const groupedBrands = useMemo(() => {
    const groups: { [key: string]: typeof brands } = {}
    filteredBrands.forEach((brand) => {
      const letter = brand.name[0].toUpperCase()
      if (!groups[letter]) {
        groups[letter] = []
      }
      groups[letter].push(brand)
    })
    return groups
  }, [filteredBrands])

  const letters = Object.keys(groupedBrands).sort()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-secondary py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
              Marcas
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-pretty">
              Explore casas de perfume do mundo todo — de maisons clássicas a criadores independentes.
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
                  placeholder="Buscar marcas..."
                  className="pl-10 bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Country Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      {countryFilters.find((c) => c.value === countryFilter)?.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {countryFilters.map((filter) => (
                      <DropdownMenuItem
                        key={filter.value}
                        onClick={() => setCountryFilter(filter.value)}
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
              </div>
            </div>

            {/* Results count */}
            <p className="mt-4 text-sm text-muted-foreground">
              Mostrando {filteredBrands.length} marcas
            </p>
          </div>
        </div>

        {/* Alphabet Navigation */}
        {sortBy === "name-asc" && letters.length > 0 && (
          <div className="border-b border-border bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex flex-wrap gap-2">
                {letters.map((letter) => (
                  <a
                    key={letter}
                    href={`#letter-${letter}`}
                    className="w-8 h-8 flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
                  >
                    {letter}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Brands List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {sortBy === "name-asc" ? (
            // Grouped by letter
            <div className="space-y-12">
              {letters.map((letter) => (
                <div key={letter} id={`letter-${letter}`}>
                  <h2 className="font-serif text-3xl font-semibold text-foreground mb-6 border-b border-border pb-2">
                    {letter}
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedBrands[letter].map((brand) => (
                      <Link
                        key={brand.id}
                        href={`/brands/${brand.slug}`}
                        className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="w-full h-full object-contain p-1"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                              {brand.name}
                            </h3>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {brand.country}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {brand.founded}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                              {brand.perfumeCount} perfumes
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Regular grid
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBrands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-full h-full object-contain p-1"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                        {brand.name}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {brand.country}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {brand.founded}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {brand.perfumeCount} perfumes
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filteredBrands.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Nenhuma marca encontrada para esses filtros.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setCountryFilter("all")
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
