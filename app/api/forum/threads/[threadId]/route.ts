import { NextResponse } from "next/server"
import { getPrisma } from "@/lib/prisma"
import { formatRelativeTimePt } from "@/lib/relative-time"

export async function GET(_req: Request, ctx: { params: Promise<{ threadId: string }> }) {
  try {
    const { threadId } = await ctx.params
    const prisma = getPrisma()

    const thread = await prisma.forumThread.findUnique({
      where: { id: threadId },
      include: {
        user: { select: { id: true, name: true } },
        replies: {
          orderBy: { createdAt: "asc" },
          include: { user: { select: { id: true, name: true } } },
        },
      },
    })

    if (!thread) {
      return NextResponse.json({ error: "Tópico não encontrado." }, { status: 404 })
    }

    await prisma.forumThread.update({
      where: { id: threadId },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json({
      thread: {
        id: thread.id,
        title: thread.title,
        body: thread.body,
        category: thread.category,
        author: thread.user.name,
        authorId: thread.user.id,
        replyCount: thread.replyCount,
        viewCount: thread.viewCount + 1,
        createdAt: thread.createdAt.toISOString(),
        updatedAt: thread.updatedAt.toISOString(),
        lastActivity: formatRelativeTimePt(thread.updatedAt),
      },
      replies: thread.replies.map((r) => ({
        id: r.id,
        content: r.content,
        author: r.user.name,
        authorId: r.user.id,
        createdAt: r.createdAt.toISOString(),
      })),
    })
  } catch (e) {
    console.error("GET forum thread", e)
    return NextResponse.json({ error: "Erro ao carregar tópico." }, { status: 500 })
  }
}
