"use client"

import { use, useCallback, useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { perfumes, notes, getSimilarPerfumes, type Inspiration } from "@/lib/data"
import { Heart, Star, Share2, ChevronRight, Sparkles, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPerfumeImage } from "@/lib/perfume-images"
import { PerfumeReviewCard } from "@/components/perfume-review-card"
import { PerfumeReviewFormDialog } from "@/components/perfume-review-form-dialog"
import type { ReviewDTO } from "@/lib/reviews-serialize"
import { usePublicStats } from "@/components/public-stats-provider"

function InspirationCard({ inspiration }: { inspiration: Inspiration }) {
  const priceColors = {
    budget: "bg-emerald-100 text-emerald-700",
    mid: "bg-amber-100 text-amber-700",
    luxury: "bg-rose-100 text-rose-700"
  }
  
  const priceLabels = {
    budget: "Bom custo-benefício",
    mid: "Faixa intermediária",
    luxury: "Luxo"
  }
  
  return (
    <Link
      href={`/perfumes/${inspiration.perfumeId}`}
      className="group bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
            {inspiration.name}
          </h4>
          <p className="text-sm text-muted-foreground">{inspiration.brand}</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          {inspiration.similarity}% de compatibilidade
        </div>
      </div>
      
      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
        {inspiration.description}
      </p>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {inspiration.notes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="px-2 py-0.5 text-xs bg-secondary rounded-full text-muted-foreground"
            >
            </span>
          ))}
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${priceColors[inspiration.priceRange]}`}>
          {priceLabels[inspiration.priceRange]}
        </span>
      </div>
    </Link>
  )
}

export default function PerfumeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState<"details" | "inspirations">("details")
  const [apiReviews, setApiReviews] = useState<ReviewDTO[]>([])
  const [liveStats, setLiveStats] = useState<{ avgRating: number; count: number } | null>(null)
  const [reviewsLoaded, setReviewsLoaded] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
  const [editReview, setEditReview] = useState<ReviewDTO | null>(null)
  const { refresh: refreshPublicStats } = usePublicStats()

  const perfume = perfumes.find((p) => p.id === id)

  const loadReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?perfumeId=${encodeURIComponent(id)}`, { credentials: "include" })
      const data = await res.json()
      if (res.ok) {
        setApiReviews(data.reviews ?? [])
        setLiveStats(data.stats ?? null)
      }
    } catch {
      /* keep empty */
    } finally {
      setReviewsLoaded(true)
    }
  }, [id])

  useEffect(() => {
    void loadReviews()
  }, [loadReviews])

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" })
        const data = await res.json()
        setCurrentUserId(data.user?.id ?? null)
      } catch {
        setCurrentUserId(null)
      }
    })()
  }, [])

  if (!perfume) {
    notFound()
  }

  const inspirations = getSimilarPerfumes(id)

  const useCommunityRating = reviewsLoaded && liveStats !== null && liveStats.count > 0
  const displayRating = useCommunityRating && liveStats ? liveStats.avgRating : perfume.rating
  const displayCount = useCommunityRating && liveStats ? liveStats.count : perfume.reviewCount

  const myReview = currentUserId ? apiReviews.find((r) => r.userId === currentUserId) : undefined

  const openReviewDialog = () => {
    if (!currentUserId) {
      window.location.href = "/perfil"
      return
    }
    if (myReview) {
      setDialogMode("edit")
      setEditReview(myReview)
    } else {
      setDialogMode("create")
      setEditReview(null)
    }
    setReviewDialogOpen(true)
  }

  const handleReviewSaved = (payload: { review: ReviewDTO; stats: { avgRating: number; count: number } }) => {
    setLiveStats(payload.stats)
    setApiReviews((prev) => {
      const others = prev.filter((r) => r.id !== payload.review.id)
      return [payload.review, ...others].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    })
    void refreshPublicStats()
  }
  const allNotes = [
    ...perfume.topNotes.map((n) => ({ note: n, type: "Top" })),
    ...perfume.middleNotes.map((n) => ({ note: n, type: "Middle" })),
    ...perfume.baseNotes.map((n) => ({ note: n, type: "Base" })),
  ]
  const termTranslations: Record<string, string> = {
    bergamot: "bergamota",
    lemon: "limão",
    orange: "laranja",
    grapefruit: "toranja",
    lime: "lima",
    mandarin: "mandarina",
    rose: "rosa",
    jasmine: "jasmim",
    iris: "íris",
    lily: "lírio",
    violet: "violeta",
    peony: "peônia",
    lavender: "lavanda",
    vanilla: "baunilha",
    amber: "âmbar",
    musk: "almíscar",
    sandalwood: "sândalo",
    cedar: "cedro",
    oakmoss: "musgo de carvalho",
    tobacco: "tabaco",
    leather: "couro",
    incense: "incenso",
    saffron: "açafrão",
    cinnamon: "canela",
    ginger: "gengibre",
    cardamom: "cardamomo",
    pepper: "pimenta",
    black: "preta",
    pink: "rosa",
    white: "branco",
    green: "verde",
    fresh: "fresco",
    woody: "amadeirado",
    floral: "floral",
    spicy: "especiado",
    fruity: "frutado",
    aquatic: "aquático",
    note: "nota",
    notes: "notas",
    blossom: "flor",
    flower: "flor",
    water: "aquático",
    sea: "marinho",
  }
  const translateOlfactoryTerm = (term: string) =>
    term
      .split(/(\s+|[-/()])/)
      .map((token) => {
        const key = token.toLowerCase()
        if (!/[a-z]/i.test(token)) return token
        return termTranslations[key] ?? token
      })
      .join("")
      .replace(/\bpimenta rosa\b/gi, "pimenta-rosa")
  const translateGender = (gender: string) => {
    const map: Record<string, string> = {
      men: "Masculino",
      women: "Feminino",
      unisex: "Unissex",
    }
    return map[gender.toLowerCase()] ?? gender
  }
  const translateDescription = (description: string) => {
    const rules: Array<[RegExp, string]> = [
      [/world's most iconic fragrance/gi, "fragrância mais icônica do mundo"],
      [/A timeless classic of/gi, "Um clássico atemporal de"],
      [/that revolutionized perfumery/gi, "que revolucionou a perfumaria"],
      [/\bfragrance\b/gi, "fragrância"],
      [/\bfragrances\b/gi, "fragrâncias"],
      [/\bnotes\b/gi, "notas"],
      [/\bfresh\b/gi, "fresco"],
      [/\bsweet\b/gi, "doce"],
      [/\bwarm\b/gi, "quente"],
      [/\bwoody\b/gi, "amadeirado"],
      [/\bfloral\b/gi, "floral"],
      [/\bcitrus\b/gi, "cítrico"],
      [/\bspicy\b/gi, "especiado"],
      [/\bpowdery\b/gi, "atalcado"],
      [/\bcreamy\b/gi, "cremoso"],
      [/\belegant\b/gi, "elegante"],
      [/\bclassic\b/gi, "clássico"],
      [/\bis a\b/gi, "é uma"],
      [/\bis an\b/gi, "é uma"],
      [/\bis the\b/gi, "é a"],
    ]

    return rules.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), description)
  }

  const getNoteSlug = (noteName: string) => {
    const existing = notes.find((item) => item.name.toLowerCase() === noteName.toLowerCase())
    if (existing) return existing.slug

    return noteName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/perfumes" className="hover:text-foreground transition-colors">
                Perfumes
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/brands/${perfume.brandSlug}`} className="hover:text-foreground transition-colors">
                {perfume.brand}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{perfume.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-secondary py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image */}
              <div className="aspect-square bg-card rounded-2xl border border-border p-8 lg:p-12 flex items-center justify-center">
                <img
                  src={getPerfumeImage(perfume)}
                  alt={`${perfume.name} de ${perfume.brand}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center">
                <p className="text-sm font-medium text-primary uppercase tracking-wide">
                  {perfume.brand}
                </p>
                <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
                  {perfume.name}
                </h1>

                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      <span className="text-lg font-semibold text-foreground">
                        {displayRating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      ({displayCount.toLocaleString()} avaliações
                      {useCommunityRating ? "" : " · catálogo"})
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-sm bg-card border border-border rounded-full text-foreground">
                    {perfume.concentration}
                  </span>
                  <span className="px-3 py-1 text-sm bg-card border border-border rounded-full text-foreground capitalize">
                    {translateGender(perfume.gender)}
                  </span>
                  <span className="px-3 py-1 text-sm bg-card border border-border rounded-full text-foreground">
                    {perfume.year}
                  </span>
                </div>

                <p className="mt-6 text-muted-foreground leading-relaxed">
                  {translateDescription(perfume.description)}
                </p>

                {/* Performance */}
                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Fixação</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${perfume.longevity * 10}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {perfume.longevity}/10
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Projeção</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${perfume.sillage * 10}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {perfume.sillage}/10
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex items-center gap-3">
                  <Button
                    size="lg"
                    variant={isLiked ? "default" : "outline"}
                    className="gap-2"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                    {isLiked ? "Na lista de desejos" : "Adicionar a lista de desejos"}
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Share2 className="h-5 w-5" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="border-b border-border bg-card sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "details"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Detalhes e notas
              </button>
              <button
                onClick={() => setActiveTab("inspirations")}
                className={`py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === "inspirations"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Inspirações recomendadas
                {inspirations.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                    {inspirations.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {activeTab === "details" && (
        <>
        {/* Notes & Accords */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Notes Pyramid */}
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  Notas da fragrância
                </h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Notas de topo
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {perfume.topNotes.map((note) => (
                        <Link
                          key={note}
                          href={`/notes/${getNoteSlug(note)}`}
                          className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-full text-sm text-foreground transition-colors"
                        >
                          {translateOlfactoryTerm(note)}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {perfume.middleNotes.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        Notas de corpo
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {perfume.middleNotes.map((note) => (
                          <Link
                            key={note}
                            href={`/notes/${getNoteSlug(note)}`}
                            className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-full text-sm text-foreground transition-colors"
                          >
                            {translateOlfactoryTerm(note)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {perfume.baseNotes.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        Notas de fundo
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {perfume.baseNotes.map((note) => (
                          <Link
                            key={note}
                            href={`/notes/${getNoteSlug(note)}`}
                            className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-full text-sm text-foreground transition-colors"
                          >
                            {translateOlfactoryTerm(note)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Accords */}
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  Acordes principais
                </h2>
                <div className="mt-6 space-y-3">
                  {perfume.accords.map((accord, index) => (
                    <div key={accord} className="flex items-center gap-3">
                      <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/80 rounded-full flex items-center px-4"
                          style={{ width: `${100 - index * 15}%` }}
                        >
                          <span className="text-sm font-medium text-primary-foreground">
                            {translateOlfactoryTerm(accord)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-12 lg:py-16 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Avaliações da comunidade ({reviewsLoaded ? apiReviews.length.toLocaleString() : "…"})
              </h2>
              <Button type="button" onClick={openReviewDialog}>
                {myReview ? "Editar sua avaliação" : "Escrever avaliação"}
              </Button>
            </div>

            {!reviewsLoaded ? (
              <p className="mt-8 text-sm text-muted-foreground">Carregando avaliações…</p>
            ) : apiReviews.length > 0 ? (
              <div className="mt-8 space-y-6">
                {apiReviews.map((review) => (
                  <PerfumeReviewCard
                    key={review.id}
                    review={review}
                    currentUserId={currentUserId}
                    onEdit={() => {
                      setDialogMode("edit")
                      setEditReview(review)
                      setReviewDialogOpen(true)
                    }}
                    onDeleted={() => {
                      void loadReviews()
                      void refreshPublicStats()
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-8 text-center py-12 bg-card rounded-xl border border-border">
                <p className="text-muted-foreground">
                  Ainda não há avaliações na comunidade. Seja a primeira pessoa a avaliar esta fragrância.
                </p>
                <Button type="button" className="mt-4" onClick={openReviewDialog}>
                  Escrever avaliação
                </Button>
              </div>
            )}
          </div>
        </section>

        <PerfumeReviewFormDialog
          open={reviewDialogOpen}
          onOpenChange={setReviewDialogOpen}
          perfumeId={id}
          perfumeName={perfume.name}
          mode={dialogMode}
          initialReview={dialogMode === "edit" ? editReview : null}
          onSaved={handleReviewSaved}
        />
        </>
        )}

        {activeTab === "inspirations" && (
          <section className="py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  Inspirações recomendadas
                </h2>
              </div>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                Descubra fragrâncias com perfil semelhante ao de {perfume.name}. As recomendações consideram notas, acordes e características olfativas em comum.
              </p>

              {inspirations.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inspirations.map((inspiration) => (
                    <InspirationCard key={inspiration.id} inspiration={inspiration} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Nenhuma fragrância parecida foi encontrada.</p>
                  <p className="text-sm text-muted-foreground mt-2">Esta fragrância tem um perfil único.</p>
                </div>
              )}

              {/* Discovery Tools CTA */}
              <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-border">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      Procurando mais opções?
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Use nossas ferramentas de descoberta para encontrar fragrâncias no seu estilo.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline">
                      <Link href="/discover/similar">Encontrar similares</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/discover/build">Montar por notas</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
