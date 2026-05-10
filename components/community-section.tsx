"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Star, MessageCircle, TrendingUp } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatCompactNumber, siteStats } from "@/lib/site-stats"
import { usePublicStats } from "@/components/public-stats-provider"

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function CommunitySection() {
  const { loaded: statsLoaded, totalReviews, forumThreadCount } = usePublicStats()
  const [preview, setPreview] = useState<
    Array<{
      id: string
      perfumeId: string
      userName: string
      perfumeName: string
      brand: string
      rating: number
      excerpt: string
      timeLabel: string
      initials: string
    }>
  >([])
  const [forumPreview, setForumPreview] = useState<
    Array<{ id: string; title: string; replies: number; views: number }>
  >([])

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/reviews?recent=1&take=3", { credentials: "include" })
        const data = await res.json()
        if (!res.ok) return
        const rows = (data.reviews ?? []) as Array<{
          id: string
          perfumeId: string
          userName: string
          perfumeName: string
          perfumeBrand: string
          rating: number
          content: string
          createdAt: string
        }>
        setPreview(
          rows.map((r) => ({
            id: r.id,
            perfumeId: r.perfumeId,
            userName: r.userName,
            perfumeName: r.perfumeName,
            brand: r.perfumeBrand,
            rating: r.rating,
            excerpt: r.content,
            timeLabel: new Date(r.createdAt).toLocaleDateString("pt-BR"),
            initials: initials(r.userName),
          })),
        )
      } catch {
        /* ignore */
      }
    })()
  }, [])

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/forum/threads?take=3")
        const data = await res.json()
        if (!res.ok) return
        const threads = (data.threads ?? []) as Array<{
          id: string
          title: string
          replies: number
          views: number
        }>
        setForumPreview(threads)
      } catch {
        /* ignore */
      }
    })()
  }, [])

  const reviewStat = statsLoaded ? totalReviews : siteStats.reviews
  const forumStat = statsLoaded ? forumThreadCount : siteStats.forumPosts

  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl font-semibold text-foreground">Participe da comunidade</h2>
          <p className="mt-3 text-muted-foreground">Converse com pessoas que também amam perfumes</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-amber-500" />
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Avaliações recentes ({formatCompactNumber(reviewStat)})
              </h3>
            </div>
            <div className="space-y-6">
              {preview.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  As primeiras avaliações aparecerão aqui quando os usuários publicarem nas páginas dos perfumes.
                </p>
              ) : (
                preview.map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">{review.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-foreground">{review.userName}</span>
                        <span className="text-muted-foreground text-sm">avaliou</span>
                        <Link
                          href={`/perfumes/${review.perfumeId}`}
                          className="font-medium text-sm text-primary hover:underline"
                        >
                          {review.perfumeName}
                        </Link>
                      </div>
                      <p className="text-xs text-muted-foreground">{review.brand}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating ? "fill-amber-400 text-amber-400" : "text-border"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{review.excerpt}</p>
                      <p className="text-xs text-muted-foreground mt-2">{review.timeLabel}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Link
              href="/community"
              className="mt-6 block w-full py-2.5 text-sm font-medium text-primary hover:underline text-center"
            >
              Ver mais →
            </Link>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Tópicos em alta ({formatCompactNumber(forumStat)})
              </h3>
            </div>
            <div className="space-y-4">
              {forumPreview.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Os tópicos do fórum aparecerão aqui. Abra a comunidade para iniciar uma discussão.
                </p>
              ) : (
                forumPreview.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/community/thread/${topic.id}`}
                    className="block w-full text-left p-4 rounded-xl bg-secondary hover:bg-muted transition-colors"
                  >
                    <p className="font-medium text-foreground line-clamp-2">{topic.title}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" />
                        {topic.replies} respostas
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {topic.views.toLocaleString()} visualizações
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
            <Link
              href="/community"
              className="mt-6 block w-full py-2.5 text-sm font-medium text-primary hover:underline text-center"
            >
              Ir para a comunidade →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
