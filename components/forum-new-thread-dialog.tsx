"use client"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FORUM_CATEGORY_VALUES } from "@/lib/forum-categories"

export type ForumThreadListItem = {
  id: string
  title: string
  category: string
  author: string
  replies: number
  views: number
  lastActivity: string
  updatedAt: string
}

export function ForumNewThreadDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: (thread: ForumThreadListItem) => void
}) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [category, setCategory] = useState<string>(FORUM_CATEGORY_VALUES[0])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const reset = () => {
    setTitle("")
    setBody("")
    setCategory(FORUM_CATEGORY_VALUES[0])
    setError("")
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    if (title.trim().length < 3 || body.trim().length < 10) {
      setError("Título (mín. 3) e mensagem (mín. 10 caracteres) são obrigatórios.")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/forum/threads", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), body: body.trim(), category }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Não foi possível criar o tópico.")
        return
      }
      onCreated(data.thread)
      reset()
      onOpenChange(false)
    } catch {
      setError("Falha de rede.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) reset()
        onOpenChange(v)
      }}
    >
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova discussão</DialogTitle>
          <DialogDescription>Compartilhe uma dúvida, recomendação ou tema com a comunidade.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ft-title">Título</Label>
            <Input id="ft-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ft-cat">Categoria</Label>
            <select
              id="ft-cat"
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {FORUM_CATEGORY_VALUES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ft-body">Mensagem</Label>
            <Textarea
              id="ft-body"
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="resize-y min-h-[140px]"
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Publicando…" : "Publicar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
