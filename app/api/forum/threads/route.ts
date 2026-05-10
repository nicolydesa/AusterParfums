import { NextResponse } from "next/server"
import { z } from "zod"
import { getPrisma } from "@/lib/prisma"
import { getSessionUserId } from "@/lib/session"
import { formatRelativeTimePt } from "@/lib/relative-time"

const createSchema = z.object({
  title: z.string().trim().min(3).max(200),
  body: z.string().trim().min(10).max(20000),
  category: z.enum(["Recomendações", "Discussão", "Coleções", "Educação", "Notícias"]),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const take = Math.min(50, Math.max(1, Number(searchParams.get("take")) || 20))
    const skip = Math.max(0, Number(searchParams.get("skip")) || 0)
    const category = searchParams.get("category")

    const prisma = getPrisma()
    const where = category ? { category } : {}

    const [threads, totalCount, categoryGroups] = await Promise.all([
      prisma.forumThread.findMany({
        where,
        take,
        skip,
        orderBy: { updatedAt: "desc" },
        include: { user: { select: { name: true } } },
      }),
      prisma.forumThread.count({ where }),
      prisma.forumThread.groupBy({
        by: ["category"],
        _count: { id: true },
      }),
    ])

    const categoryCounts: Record<string, number> = {}
    for (const g of categoryGroups) {
      categoryCounts[g.category] = g._count.id
    }

    return NextResponse.json({
      threads: threads.map((t) => ({
        id: t.id,
        title: t.title,
        category: t.category,
        author: t.user.name,
        replies: t.replyCount,
        views: t.viewCount,
        lastActivity: formatRelativeTimePt(t.updatedAt),
        updatedAt: t.updatedAt.toISOString(),
      })),
      totalCount,
      categoryCounts,
    })
  } catch (e) {
    console.error("GET forum threads", e)
    return NextResponse.json({ error: "Erro ao carregar tópicos." }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getSessionUserId()
    if (!userId) {
      return NextResponse.json({ error: "Faça login para criar um tópico." }, { status: 401 })
    }

    const json = await req.json()
    const parsed = createSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: "Título ou texto inválido." }, { status: 400 })
    }

    const prisma = getPrisma()
    const thread = await prisma.forumThread.create({
      data: {
        title: parsed.data.title,
        body: parsed.data.body,
        category: parsed.data.category,
        userId,
      },
      include: { user: { select: { name: true } } },
    })

    return NextResponse.json({
      thread: {
        id: thread.id,
        title: thread.title,
        category: thread.category,
        author: thread.user.name,
        replies: thread.replyCount,
        views: thread.viewCount,
        lastActivity: formatRelativeTimePt(thread.updatedAt),
        updatedAt: thread.updatedAt.toISOString(),
      },
    })
  } catch (e) {
    console.error("POST forum thread", e)
    return NextResponse.json({ error: "Erro ao criar tópico." }, { status: 500 })
  }
}
