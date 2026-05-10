"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { categoryBadgeClass } from "@/lib/forum-categories"
import { ChevronLeft, Eye, MessageSquare } from "lucide-react"
import { notFound } from "next/navigation"

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

type ThreadPayload = {
  id: string
  title: string
  body: string
  category: string
  author: string
  authorId: string
  replyCount: number
  viewCount: number
  createdAt: string
  lastActivity: string
}

type ReplyPayload = {
  id: string
  content: string
  author: string
  authorId: string
  createdAt: string
}

export default function ForumThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [thread, setThread] = useState<ThreadPayload | null>(null)
  const [replies, setReplies] = useState<ReplyPayload[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [replyBusy, setReplyBusy] = useState(false)
  const [replyError, setReplyError] = useState("")

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch(`/api/forum/threads/${encodeURIComponent(id)}`)
        const data = await res.json()
        if (res.status === 404 || !res.ok) {
          setThread(null)
          setReplies([])
          return
        }
        setThread(data.thread)
        setReplies(data.replies ?? [])
      } catch {
        setThread(null)
        setReplies([])
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

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

  if (!loading && !thread) {
    notFound()
  }

  const submitReply = async () => {
    if (!currentUserId) {
      window.location.href = "/perfil"
      return
    }
    const text = replyText.trim()
    if (text.length < 2) {
      setReplyError("Escreva uma resposta.")
      return
    }
    setReplyError("")
    setReplyBusy(true)
    try {
      const res = await fetch(`/api/forum/threads/${encodeURIComponent(id)}/replies`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      })
      const data = await res.json()
      if (!res.ok) {
        setReplyError(data.error ?? "Erro ao enviar.")
        return
      }
      setReplies((prev) => [...prev, data.reply])
      setThread((t) =>
        t ? { ...t, replyCount: t.replyCount + 1, lastActivity: "agora" } : t,
      )
      setReplyText("")
    } catch {
      setReplyError("Falha de rede.")
    } finally {
      setReplyBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <Button asChild variant="ghost" className="mb-6 gap-1 -ml-2 text-muted-foreground">
          <Link href="/community">
            <ChevronLeft className="h-4 w-4" />
            Comunidade
          </Link>
        </Button>

        {loading || !thread ? (
          <p className="text-sm text-muted-foreground">Carregando…</p>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryBadgeClass(thread.category)}`}>
                {thread.category}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {thread.replyCount} respostas
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {thread.viewCount.toLocaleString("pt-BR")} visualizações
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground text-balance">
              {thread.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              por {thread.author} · {new Date(thread.createdAt).toLocaleString("pt-BR")}
            </p>
            <div className="mt-8 max-w-none">
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{thread.body}</p>
            </div>

            <section className="mt-12 border-t border-border pt-10">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Respostas</h2>
              <div className="space-y-6">
                {replies.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhuma resposta ainda. Seja o primeiro.</p>
                ) : (
                  replies.map((r) => (
                    <div key={r.id} className="flex gap-3">
                      <Avatar className="h-9 w-9 flex-shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {initials(r.author)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0 rounded-xl border border-border bg-card p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-foreground">{r.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(r.createdAt).toLocaleString("pt-BR")}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{r.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 space-y-3">
                <Textarea
                  placeholder={currentUserId ? "Escreva sua resposta…" : "Entre na conta para responder"}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  disabled={!currentUserId}
                  rows={4}
                  className="resize-y"
                />
                {replyError && <p className="text-sm text-destructive">{replyError}</p>}
                <Button type="button" onClick={submitReply} disabled={replyBusy || !currentUserId}>
                  {replyBusy ? "Enviando…" : currentUserId ? "Publicar resposta" : "Entrar para responder"}
                </Button>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
