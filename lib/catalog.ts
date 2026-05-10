import { perfumes } from "@/lib/data"

export function isCatalogPerfumeId(id: string): boolean {
  return perfumes.some((p) => p.id === id)
}

export function getCatalogPerfume(id: string) {
  return perfumes.find((p) => p.id === id)
}
