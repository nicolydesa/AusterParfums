import Link from "next/link"
import { BrandLogoThumb } from "@/components/brand-logo-thumb"
import { brands as allBrands, getPerfumesByBrand } from "@/lib/data"
import { formatCompactNumber, siteStats } from "@/lib/site-stats"

const brands = [...allBrands]
  .map((b) => ({ brand: b, perfumeCount: getPerfumesByBrand(b.slug).length }))
  .sort((a, b) => b.perfumeCount - a.perfumeCount)
  .slice(0, 8)

export function BrandsSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl font-semibold text-foreground">Marcas em destaque</h2>
          <p className="mt-3 text-muted-foreground">
            Explore perfumes das marcas mais presentes no catálogo
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.brand.id}
              href={`/brands/${brand.brand.slug}`}
              className="group flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-3 overflow-hidden p-2 ring-1 ring-border/50 group-hover:ring-primary/35 transition-all">
                <BrandLogoThumb name={brand.brand.name} logoUrl={brand.brand.logo} size={44} className="max-h-10 max-w-10" />
              </div>
              <span className="font-medium text-sm text-foreground text-center">{brand.brand.name}</span>
              <span className="text-xs text-muted-foreground mt-1">{brand.perfumeCount} perfumes</span>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="mt-10 text-center">
          <Link href="/brands" className="text-primary hover:underline font-medium">
            Ver todas as {formatCompactNumber(siteStats.brands)} marcas →
          </Link>
        </div>
      </div>
    </section>
  )
}
