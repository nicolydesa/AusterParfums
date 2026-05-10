"use client"

import { FormEvent, useEffect, useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import type { ReviewDTO } from "@/lib/reviews-serialize"

type StatsPayload = { avgRating: number; count: number }

export function PerfumeReviewFormDialog({
  open,
  onOpenChange,
  perfumeId,
  perfumeName,
  mode,
  initialReview,
  onSaved,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  perfumeId: string
  perfumeName: string
  mode: "create" | "edit"
  initialReview?: ReviewDTO | null
  onSaved: (payload: { review: ReviewDTO; stats: StatsPayload }) => void
}) {
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState("")
  const [longevity, setLongevity] = useState(7)
  const [sillage, setSillage] = useState(7)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!open) return
    setError("")
    if (mode === "edit" && initialReview) {
      setRating(initialReview.rating)
      setContent(initialReview.content)
      setLongevity(initialReview.longevity)
      setSillage(initialReview.sillage)
    } else {
      setRating(5)
      setContent("")
      setLongevity(7)
      setSillage(7)
    }
  }, [open, mode, initialReview])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    if (content.trim().length < 10) {
      setError("Escreva pelo menos 10 caracteres.")
      return
    }
    setSubmitting(true)
    try {
      if (mode === "create") {
        const res = await fetch("/api/reviews", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            perfumeId,
            rating,
            content: content.trim(),
            longevity,
            sillage,
          }),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error ?? "Não foi possível publicar.")
          return
        }
        onSaved({ review: data.review, stats: data.stats })
        onOpenChange(false)
        return
      }

      if (!initialReview) return
      const res = await fetch(`/api/reviews/${initialReview.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          content: content.trim(),
          longevity,
          sillage,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Não foi possível salvar.")
        return
      }
      onSaved({ review: data.review, stats: data.stats })
      onOpenChange(false)
    } catch {
      setError("Falha de rede.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Nova avaliação" : "Editar avaliação"}</DialogTitle>
          <DialogDescription>
            {perfumeName} — compartilhe sua experiência com a fragrância.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="mb-2 block">Nota geral</Label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className="p-1 rounded-md hover:bg-secondary"
                  aria-label={`${i + 1} estrelas`}
                >
                  <Star
                    className={`h-8 w-8 ${
                      i < rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rev-long">Fixação (1–10)</Label>
              <Input
                id="rev-long"
                type="number"
                min={1}
                max={10}
                value={longevity}
                onChange={(e) => setLongevity(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rev-sil">Projeção (1–10)</Label>
              <Input
                id="rev-sil"
                type="number"
                min={1}
                max={10}
                value={sillage}
                onChange={(e) => setSillage(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rev-text">Comentário</Label>
            <Textarea
              id="rev-text"
              rows={5}
              placeholder="Como foi na pele? Ocasiões, estação do ano, evolução…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="resize-y min-h-[120px]"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Salvando…" : mode === "create" ? "Publicar" : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
