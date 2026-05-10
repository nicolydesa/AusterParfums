import { NextResponse } from "next/server"
import { z } from "zod"
import { getCatalogPerfume } from "@/lib/catalog"
import { getPrisma } from "@/lib/prisma"
import { getSessionUserId } from "@/lib/session"
import { toReviewDTOs } from "@/lib/reviews-serialize"

const patchSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  content: z.string().trim().min(10).max(8000).optional(),
  longevity: z.number().int().min(1).max(10).optional(),
  sillage: z.number().int().min(1).max(10).optional(),
})

export async function PATCH(req: Request, ctx: { params: Promise<{ reviewId: string }> }) {
  try {
    const userId = await getSessionUserId()
    if (!userId) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 })
    }

    const { reviewId } = await ctx.params
    const json = await req.json()
    const parsed = patchSchema.safeParse(json)
    if (!parsed.success || Object.keys(parsed.data).length === 0) {
      return NextResponse.json({ error: "Nada para atualizar." }, { status: 400 })
    }

    const prisma = getPrisma()
    const existing = await prisma.perfumeReview.findUnique({
      where: { id: reviewId },
      select: { userId: true, perfumeId: true },
    })

    if (!existing) {
      return NextResponse.json({ error: "Avaliação não encontrada." }, { status: 404 })
    }
    if (existing.userId !== userId) {
      return NextResponse.json({ error: "Sem permissão." }, { status: 403 })
    }

    const row = await prisma.perfumeReview.update({
      where: { id: reviewId },
      data: parsed.data,
      include: {
        user: { select: { id: true, name: true } },
        _count: { select: { helpfulVotes: true } },
      },
    })

    const [dto] = await toReviewDTOs(prisma, [row], userId)
    const agg = await prisma.perfumeReview.aggregate({
      where: { perfumeId: existing.perfumeId },
      _avg: { rating: true },
      _count: { id: true },
    })

    return NextResponse.json({
      review: dto,
      stats: {
        avgRating: agg._avg.rating ?? 0,
        count: agg._count.id,
      },
    })
  } catch (e) {
    console.error("PATCH /api/reviews/[reviewId]", e)
    return NextResponse.json({ error: "Erro ao atualizar." }, { status: 500 })
  }
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ reviewId: string }> }) {
  try {
    const userId = await getSessionUserId()
    if (!userId) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 })
    }

    const { reviewId } = await ctx.params
    const prisma = getPrisma()

    const existing = await prisma.perfumeReview.findUnique({
      where: { id: reviewId },
      select: { userId: true, perfumeId: true },
    })

    if (!existing) {
      return NextResponse.json({ error: "Avaliação não encontrada." }, { status: 404 })
    }
    if (existing.userId !== userId) {
      return NextResponse.json({ error: "Sem permissão." }, { status: 403 })
    }

    await prisma.perfumeReview.delete({ where: { id: reviewId } })

    const agg = await prisma.perfumeReview.aggregate({
      where: { perfumeId: existing.perfumeId },
      _avg: { rating: true },
      _count: { id: true },
    })

    const perfume = getCatalogPerfume(existing.perfumeId)

    return NextResponse.json({
      ok: true,
      perfumeId: existing.perfumeId,
      stats: {
        avgRating: agg._count.id > 0 ? agg._avg.rating ?? 0 : 0,
        count: agg._count.id,
      },
      catalogFallback: perfume
        ? { rating: perfume.rating, reviewCount: perfume.reviewCount }
        : null,
    })
  } catch (e) {
    console.error("DELETE /api/reviews/[reviewId]", e)
    return NextResponse.json({ error: "Erro ao remover." }, { status: 500 })
  }
}
