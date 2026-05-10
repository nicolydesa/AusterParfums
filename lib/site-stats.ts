import { brands, forumPosts, notes, perfumes, reviews } from "@/lib/data"

export const siteStats = {
  perfumes: perfumes.length,
  brands: brands.length,
  notes: notes.length,
  reviews: reviews.length,
  forumPosts: forumPosts.length,
}

export function formatCompactNumber(n: number) {
  return new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 }).format(n)
}

