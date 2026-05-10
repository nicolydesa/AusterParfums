import { NextResponse } from "next/server"
import { getPrisma } from "@/lib/prisma"
import type { PublicStatsPayload } from "@/lib/public-stats-types"

export async function GET() {
  try {
    const prisma = getPrisma()
    const [grouped, totalReviews, forumThreadCount] = await Promise.all([
      prisma.perfumeReview.groupBy({
        by: ["perfumeId"],
        _count: { id: true },
        _avg: { rating: true },
      }),
      prisma.perfumeReview.count(),
      prisma.forumThread.count(),
    ])

    const byPerfumeId: PublicStatsPayload["byPerfumeId"] = {}
    for (const g of grouped) {
      byPerfumeId[g.perfumeId] = {
        count: g._count.id,
        avgRating: g._avg.rating ?? 0,
      }
    }

    const payload: PublicStatsPayload = {
      totalReviews,
      byPerfumeId,
      forumThreadCount,
    }
    return NextResponse.json(payload)
  } catch (e) {
    console.error("public-stats", e)
    const fallback: PublicStatsPayload = {
      totalReviews: 0,
      byPerfumeId: {},
      forumThreadCount: 0,
    }
    return NextResponse.json(fallback)
  }
}
