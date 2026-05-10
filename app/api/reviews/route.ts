import { NextResponse } from "next/server"
import { z } from "zod"
import { getCatalogPerfume, isCatalogPerfumeId } from "@/lib/catalog"
import { getPrisma } from "@/lib/prisma"
import { getSessionUserId } from "@/lib/session"
import { toReviewDTOs } from "@/lib/reviews-serialize"

const createSchema = z.object({
  perfumeId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  content: z.string().trim().min(10).max(8000),
  longevity: z.number().int().min(1).max(10),
  sillage: z.number().int().min(1).max(10),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const perfumeId = searchParams.get("perfumeId")
    const recent = searchParams.get("recent")
    const take = Math.min(50, Math.max(1, Number(searchParams.get("take")) || 20))

    const prisma = getPrisma()
    const viewerId = await getSessionUserId()

    if (perfumeId) {
      if (!isCatalogPerfumeId(perfumeId)) {
        return NextResponse.json({ error: "Perfume não encontrado no catálogo." }, { status: 400 })
      }

      const [rows, agg] = await Promise.all([
        prisma.perfumeReview.findMany({
          where: { perfumeId },
          include: {
            user: { select: { id: true, name: true } },
            _count: { select: { helpfulVotes: true } },
          },
          orderBy: { createdAt: "desc" },
        }),
        prisma.perfumeReview.aggregate({
          where: { perfumeId },
          _avg: { rating: true },
          _count: { id: true },
        }),
      ])

      const reviews = await toReviewDTOs(prisma, rows, viewerId)

      return NextResponse.json({
        reviews,
        stats: {
          avgRating: agg._avg.rating ?? 0,
          count: agg._count.id,
        },
      })
    }

    if (recent === "1" || recent === "true") {
      const totalCount = await prisma.perfumeReview.count()
      const rows = await prisma.perfumeReview.findMany({
        take,
        include: {
          user: { select: { id: true, name: true } },
          _count: { select: { helpfulVotes: true } },
        },
        orderBy: { createdAt: "desc" },
      })
      const reviews = await toReviewDTOs(prisma, rows, viewerId)
      return NextResponse.json({ reviews, totalCount })
    }

    return NextResponse.json({ error: "Informe perfumeId ou recent=1." }, { status: 400 })
  } catch (e) {
    console.error("GET /api/reviews", e)
    return NextResponse.json({ error: "Erro ao carregar avaliações." }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getSessionUserId()
    if (!userId) {
      return NextResponse.json({ error: "Faça login para avaliar." }, { status: 401 })
    }

    const json = await req.json()
    const parsed = createSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Texto da avaliação deve ter ao menos 10 caracteres. Verifique também notas e estrelas." },
        { status: 400 },
      )
    }

    const { perfumeId, rating, content, longevity, sillage } = parsed.data
    if (!isCatalogPerfumeId(perfumeId)) {
      return NextResponse.json({ error: "Perfume inválido." }, { status: 400 })
    }

    const prisma = getPrisma()

    try {
      const row = await prisma.perfumeReview.create({
        data: {
          perfumeId,
          userId,
          rating,
          content,
          longevity,
          sillage,
        },
        include: {
          user: { select: { id: true, name: true } },
          _count: { select: { helpfulVotes: true } },
        },
      })

      const [dto] = await toReviewDTOs(prisma, [row], userId)
      const perfume = getCatalogPerfume(perfumeId)!
      const agg = await prisma.perfumeReview.aggregate({
        where: { perfumeId },
        _avg: { rating: true },
        _count: { id: true },
      })

      return NextResponse.json({
        review: dto,
        stats: {
          avgRating: agg._avg.rating ?? 0,
          count: agg._count.id,
        },
        perfumeName: perfume.name,
      })
    } catch (e: unknown) {
      const code = typeof e === "object" && e !== null && "code" in e ? String((e as { code: string }).code) : ""
      if (code === "P2002") {
        return NextResponse.json({ error: "Você já avaliou este perfume. Edite ou remova a avaliação anterior." }, { status: 409 })
      }
      throw e
    }
  } catch (e) {
    console.error("POST /api/reviews", e)
    return NextResponse.json({ error: "Erro ao publicar avaliação." }, { status: 500 })
  }
}
