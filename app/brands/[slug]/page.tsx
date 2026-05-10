"use client"

import { use } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PerfumeCard } from "@/components/perfume-card"
import { brands, getPerfumesByBrand } from "@/lib/data"
import { MapPin, Calendar, ChevronRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPerfumeImage } from "@/lib/perfume-images"

export default function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  
  const brand = brands.find((b) => b.slug === slug)
  
  if (!brand) {
    notFound()
  }

  const brandPerfumes = getPerfumesByBrand(slug)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/brands" className="hover:text-foreground transition-colors">
                Marcas
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{brand.name}</span>
            </nav>
          </div>
        </div>

        {/* Brand Header */}
        <section className="bg-secondary py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Logo */}
              <div className="w-32 h-32 rounded-2xl bg-card border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
                  {brand.name}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {brand.country}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Fundada em {brand.founded}
                  </span>
                  <span className="text-foreground font-medium">
                    {brand.perfumeCount} perfumes
                  </span>
                </div>
                <p className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed">
                  {brand.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Perfumes by this brand */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Perfumes de {brand.name}
            </h2>

            {brandPerfumes.length > 0 ? (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {brandPerfumes.map((perfume) => (
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
              <div className="mt-8 text-center py-16 bg-card rounded-xl border border-border">
                <p className="text-muted-foreground">Ainda nao encontramos perfumes dessa marca na base.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
