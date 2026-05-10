import { NextResponse } from "next/server"
import { getPrisma } from "@/lib/prisma"
import { getSessionUserId } from "@/lib/session"

export async function POST(_req: Request, ctx: { params: Promise<{ reviewId: string }> }) {
  try {
    const userId = await getSessionUserId()
    if (!userId) {
      return NextResponse.json({ error: "Faça login para marcar como útil." }, { status: 401 })
    }

    const { reviewId } = await ctx.params
    const prisma = getPrisma()

    const review = await prisma.perfumeReview.findUnique({
      where: { id: reviewId },
      select: { id: true, userId: true },
    })

    if (!review) {
      return NextResponse.json({ error: "Avaliação não encontrada." }, { status: 404 })
    }
    if (review.userId === userId) {
      return NextResponse.json({ error: "Você não pode votar na própria avaliação." }, { status: 400 })
    }

    const existing = await prisma.reviewHelpfulVote.findUnique({
      where: {
        reviewId_userId: { reviewId, userId },
      },
    })

    let helpfulByMe: boolean
    if (existing) {
      await prisma.reviewHelpfulVote.delete({ where: { id: existing.id } })
      helpfulByMe = false
    } else {
      await prisma.reviewHelpfulVote.create({ data: { reviewId, userId } })
      helpfulByMe = true
    }

    const count = await prisma.reviewHelpfulVote.count({ where: { reviewId } })

    return NextResponse.json({ likes: count, helpfulByMe })
  } catch (e) {
    console.error("POST helpful", e)
    return NextResponse.json({ error: "Erro ao registrar voto." }, { status: 500 })
  }
}
