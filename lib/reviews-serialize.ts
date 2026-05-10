import type { PrismaClient } from "@/lib/generated/prisma/client"
import { getCatalogPerfume } from "@/lib/catalog"

export type ReviewDTO = {
  id: string
  perfumeId: string
  perfumeName: string
  perfumeBrand: string
  userId: string
  userName: string
  rating: number
  content: string
  longevity: number
  sillage: number
  date: string
  createdAt: string
  likes: number
  helpfulByMe: boolean
}

type Row = {
  id: string
  perfumeId: string
  userId: string
  rating: number
  content: string
  longevity: number
  sillage: number
  createdAt: Date
  user: { id: string; name: string }
  _count: { helpfulVotes: number }
}

export async function toReviewDTOs(
  prisma: PrismaClient,
  rows: Row[],
  viewerId: string | null,
): Promise<ReviewDTO[]> {
  const ids = rows.map((r) => r.id)
  const voted = new Set<string>()
  if (viewerId && ids.length > 0) {
    const votes = await prisma.reviewHelpfulVote.findMany({
      where: { userId: viewerId, reviewId: { in: ids } },
      select: { reviewId: true },
    })
    for (const v of votes) {
      voted.add(v.reviewId)
    }
  }
  return rows.map((r) => {
    const p = getCatalogPerfume(r.perfumeId)
    return {
      id: r.id,
      perfumeId: r.perfumeId,
      perfumeName: p?.name ?? "Perfume",
      perfumeBrand: p?.brand ?? "",
      userId: r.userId,
      userName: r.user.name,
      rating: r.rating,
      content: r.content,
      longevity: r.longevity,
      sillage: r.sillage,
      date: r.createdAt.toISOString().slice(0, 10),
      createdAt: r.createdAt.toISOString(),
      likes: r._count.helpfulVotes,
      helpfulByMe: voted.has(r.id),
    }
  })
}
