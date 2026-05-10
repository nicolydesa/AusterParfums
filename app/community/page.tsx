"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Star, MessageSquare, Eye, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatCompactNumber, siteStats } from "@/lib/site-stats"
import { PerfumeReviewCard } from "@/components/perfume-review-card"
import type { ReviewDTO } from "@/lib/reviews-serialize"
import { ForumNewThreadDialog, type ForumThreadListItem } from "@/components/forum-new-thread-dialog"
import { usePublicStats } from "@/components/public-stats-provider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { categoryBadgeClass, FORUM_CATEGORY_VALUES, isForumCategory } from "@/lib/forum-categories"

const tabs = [
  { id: "forum", label: "Fórum", icon: MessageSquare },
  { id: "reviews", label: "Avaliações recentes", icon: Star },
]

function forumAuthorInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export default function CommunityPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { loaded: statsLoaded, totalReviews, forumThreadCount, refresh } = usePublicStats()
  const [activeTab, setActiveTab] = useState("forum")
  const [feedReviews, setFeedReviews] = useState<ReviewDTO[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [forumThreads, setForumThreads] = useState<ForumThreadListItem[]>([])
  const [forumLoading, setForumLoading] = useState(true)
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [newThreadOpen, setNewThreadOpen] = useState(false)

  const replaceCommunityQuery = useCallback(
    (mutate: (p: URLSearchParams) => void) => {
      const p = new URLSearchParams(searchParams.toString())
      mutate(p)
      const qs = p.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  useEffect(() => {
    const t = searchParams.get("tab")
    if (t === "collections") {
      replaceCommunityQuery((p) => p.delete("tab"))
      setActiveTab("forum")
    } else if (t === "forum" || t === "reviews") {
      setActiveTab(t)
    }
    const fc = searchParams.get("forumCategory")
    if (fc && isForumCategory(fc)) setFilterCategory(fc)
  }, [searchParams, replaceCommunityQuery])

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/reviews?recent=1&take=40", { credentials: "include" })
        const data = await res.json()
        if (res.ok) {
          setFeedReviews(data.reviews ?? [])
        }
      } catch {
        /* ignore */
      } finally {
        setReviewsLoading(false)
      }
    })()
  }, [])

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

  useEffect(() => {
    void (async () => {
      setForumLoading(true)
      try {
        const q = filterCategory ? `&category=${encodeURIComponent(filterCategory)}` : ""
        const res = await fetch(`/api/forum/threads?take=40${q}`)
        const data = await res.json()
        if (res.ok) {
          setForumThreads(data.threads ?? [])
          setCategoryCounts(data.categoryCounts ?? {})
        }
      } catch {
        /* ignore */
      } finally {
        setForumLoading(false)
      }
    })()
  }, [filterCategory])

  const headerReviewCount = statsLoaded ? totalReviews : siteStats.reviews
  const headerForumCount = statsLoaded ? forumThreadCount : siteStats.forumPosts

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-secondary py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
              Comunidade
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-pretty">
              Conecte-se com outras pessoas apaixonadas por fragrâncias. Compartilhe avaliações,
              converse sobre seus favoritos e descubra novos perfumes com a comunidade.
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-foreground">{formatCompactNumber(headerForumCount)}</p>
                  <p className="text-sm text-muted-foreground">Tópicos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-foreground">{formatCompactNumber(headerReviewCount)}</p>
                  <p className="text-sm text-muted-foreground">Avaliações</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-foreground">{formatCompactNumber(siteStats.perfumes)}</p>
                  <p className="text-sm text-muted-foreground">Perfumes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border bg-card sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id)
                    replaceCommunityQuery((p) => {
                      p.set("tab", tab.id)
                      if (tab.id !== "forum") p.delete("forumCategory")
                    })
                  }}
                  className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {activeTab === "forum" && (
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h2 className="font-serif text-2xl font-semibold text-foreground">Discussões</h2>
                  <Button type="button" onClick={() => setNewThreadOpen(true)}>
                    Iniciar discussão
                  </Button>
                </div>

                {forumLoading ? (
                  <p className="text-sm text-muted-foreground">Carregando tópicos…</p>
                ) : forumThreads.length === 0 ? (
                  <div className="text-center py-16 bg-card rounded-xl border border-border">
                    <p className="text-muted-foreground">
                      Nenhum tópico ainda. Inicie a primeira discussão da comunidade.
                    </p>
                    <Button type="button" className="mt-4" onClick={() => setNewThreadOpen(true)}>
                      Criar tópico
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {forumThreads.map((post) => (
                      <Link key={post.id} href={`/community/thread/${post.id}`}>
                        <article className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10 flex-shrink-0">
                              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                {forumAuthorInitials(post.author)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h3 className="font-medium text-foreground hover:text-primary transition-colors">
                                    {post.title}
                                  </h3>
                                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                    <span>por {post.author}</span>
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryBadgeClass(post.category)}`}
                                    >
                                      {post.category}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-sm text-muted-foreground whitespace-nowrap">
                                  {post.lastActivity}
                                </span>
                              </div>
                              <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                  <MessageSquare className="h-4 w-4" />
                                  {post.replies} respostas
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Eye className="h-4 w-4" />
                                  {post.views.toLocaleString()} visualizações
                                </span>
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-medium text-foreground mb-4">Categorias</h3>
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFilterCategory(null)
                        replaceCommunityQuery((p) => {
                          p.set("tab", "forum")
                          p.delete("forumCategory")
                        })
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors text-left ${
                        filterCategory === null ? "bg-secondary" : ""
                      }`}
                    >
                      <span className="text-sm font-medium text-foreground">Todas</span>
                      <span className="text-sm text-muted-foreground">
                        {Object.values(categoryCounts).reduce((a, b) => a + b, 0)}
                      </span>
                    </button>
                    {FORUM_CATEGORY_VALUES.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => {
                          setFilterCategory(name)
                          replaceCommunityQuery((p) => {
                            p.set("tab", "forum")
                            p.set("forumCategory", name)
                          })
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors ${
                          filterCategory === name ? "bg-secondary" : ""
                        }`}
                      >
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${categoryBadgeClass(name)}`}
                        >
                          {name}
                        </span>
                        <span className="text-sm text-muted-foreground">{categoryCounts[name] ?? 0}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 bg-card rounded-xl border border-border p-6">
                  <h3 className="font-medium text-foreground mb-4">Regras da comunidade</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Seja respeitoso e construtivo</li>
                    <li>Compartilhe avaliações honestas</li>
                    <li>Sem spam ou autopromoção</li>
                    <li>Mantenha a conversa no tema</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <ForumNewThreadDialog
            open={newThreadOpen}
            onOpenChange={setNewThreadOpen}
            onCreated={(thread) => {
              setForumThreads((prev) => [thread, ...prev])
              void refresh()
              setCategoryCounts((c) => ({
                ...c,
                [thread.category]: (c[thread.category] ?? 0) + 1,
              }))
            }}
          />

          {activeTab === "reviews" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  Avaliações recentes
                </h2>
                <Button asChild>
                  <Link href="/perfumes">Escrever avaliação</Link>
                </Button>
              </div>

              {reviewsLoading ? (
                <p className="text-sm text-muted-foreground">Carregando avaliações…</p>
              ) : feedReviews.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-xl border border-border">
                  <p className="text-muted-foreground">
                    Ainda não há avaliações publicadas. Escolha um perfume e seja o primeiro a avaliar.
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/perfumes">Ver perfumes</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {feedReviews.map((review) => (
                    <PerfumeReviewCard
                      key={review.id}
                      review={review}
                      currentUserId={currentUserId}
                      communityVariant
                      onDeleted={() =>
                        setFeedReviews((prev) => prev.filter((r) => r.id !== review.id))
                      }
                    />
                  ))}
                </div>
              )}

              {!reviewsLoading && feedReviews.length > 0 && (
                <div className="mt-8 text-center">
                  <Button asChild variant="outline">
                    <Link href="/perfumes">Avaliar outro perfume</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
