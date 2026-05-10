"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, Clock, Wind, ThumbsUp, Pencil, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { ReviewDTO } from "@/lib/reviews-serialize"

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

export function PerfumeReviewCard({
  review,
  currentUserId,
  onEdit,
  onDeleted,
  onHelpfulToggled,
  communityVariant = false,
}: {
  review: ReviewDTO
  currentUserId: string | null
  onEdit?: () => void
  onDeleted?: () => void
  onHelpfulToggled?: (reviewId: string, likes: number, helpfulByMe: boolean) => void
  communityVariant?: boolean
}) {
  const [likes, setLikes] = useState(review.likes)
  const [helpfulByMe, setHelpfulByMe] = useState(review.helpfulByMe)
  const [busy, setBusy] = useState(false)
  const [deleteBusy, setDeleteBusy] = useState(false)

  const isOwner = currentUserId === review.userId

  const handleHelpful = async () => {
    if (!currentUserId) {
      return
    }
    setBusy(true)
    try {
      const res = await fetch(`/api/reviews/${review.id}/helpful`, {
        method: "POST",
        credentials: "include",
      })
      const data = await res.json()
      if (res.ok) {
        setLikes(data.likes)
        setHelpfulByMe(data.helpfulByMe)
        onHelpfulToggled?.(review.id, data.likes, data.helpfulByMe)
      }
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Remover sua avaliação?")) return
    setDeleteBusy(true)
    try {
      const res = await fetch(`/api/reviews/${review.id}`, { method: "DELETE", credentials: "include" })
      if (res.ok) {
        onDeleted?.()
      }
    } finally {
      setDeleteBusy(false)
    }
  }

  return (
    <article className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
            {initials(review.userName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          {communityVariant && (
            <Link
              href={`/perfumes/${review.perfumeId}`}
              className="block text-sm font-medium text-primary hover:underline mb-1"
            >
              {review.perfumeName} — {review.perfumeBrand}
            </Link>
          )}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h4 className="font-medium text-foreground">{review.userName}</h4>
            <span className="text-sm text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <p className="mt-3 text-muted-foreground leading-relaxed whitespace-pre-wrap">{review.content}</p>
          <div className="mt-4 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Fixação: {review.longevity}/10</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wind className="h-4 w-4" />
              <span>Projeção: {review.sillage}/10</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={busy || !currentUserId || isOwner}
              onClick={handleHelpful}
              className={`flex items-center gap-2 text-sm transition-colors ${
                helpfulByMe ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
              } disabled:opacity-50 disabled:pointer-events-none`}
            >
              <ThumbsUp className={`h-4 w-4 ${helpfulByMe ? "fill-primary text-primary" : ""}`} />
              <span>Útil ({likes})</span>
            </button>
            {!currentUserId && (
              <span className="text-xs text-muted-foreground">Entre para marcar como útil</span>
            )}
            {isOwner && (
              <div className="flex gap-2">
                <Button type="button" variant="ghost" size="sm" className="h-8 gap-1" onClick={onEdit}>
                  <Pencil className="h-3.5 w-3.5" />
                  Editar
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-destructive hover:text-destructive"
                  onClick={handleDelete}
                  disabled={deleteBusy}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Excluir
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
