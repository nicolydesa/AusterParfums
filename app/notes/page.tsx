"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notes, getCatalogPerfumeCountForNote } from "@/lib/data"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const categories = [
  { value: "all", label: "Todas as notas", color: "bg-muted" },
  { value: "floral", label: "Floral", color: "bg-pink-100 dark:bg-pink-950" },
  { value: "amadeirado", label: "Amadeirado", color: "bg-amber-100 dark:bg-amber-950" },
  { value: "citrico", label: "Cítrico", color: "bg-yellow-100 dark:bg-yellow-950" },
  { value: "oriental", label: "Oriental", color: "bg-orange-100 dark:bg-orange-950" },
  { value: "fresco", label: "Fresco", color: "bg-cyan-100 dark:bg-cyan-950" },
  { value: "especiado", label: "Especiado", color: "bg-red-100 dark:bg-red-950" },
  { value: "frutado", label: "Frutado", color: "bg-rose-100 dark:bg-rose-950" },
  { value: "verde", label: "Verde", color: "bg-emerald-100 dark:bg-emerald-950" },
  { value: "aquatico", label: "Aquático", color: "bg-blue-100 dark:bg-blue-950" },
  { value: "gourmand", label: "Gourmand", color: "bg-amber-100 dark:bg-amber-950" },
] as const

type NotesCategoryFilter = (typeof categories)[number]["value"]

const categoryLabels: Record<string, string> = {
  floral: "Floral",
  amadeirado: "Amadeirado",
  citrico: "Cítrico",
  oriental: "Oriental",
  fresco: "Fresco",
  especiado: "Especiado",
  frutado: "Frutado",
  verde: "Verde",
  aquatico: "Aquático",
  gourmand: "Gourmand",
}

const categoryColors: { [key: string]: string } = {
  floral: "bg-pink-50 border-pink-200 hover:bg-pink-100",
  amadeirado: "bg-amber-50 border-amber-200 hover:bg-amber-100",
  citrico: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
  oriental: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  fresco: "bg-cyan-50 border-cyan-200 hover:bg-cyan-100",
  especiado: "bg-red-50 border-red-200 hover:bg-red-100",
  frutado: "bg-rose-50 border-rose-200 hover:bg-rose-100",
  verde: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
  aquatico: "bg-blue-50 border-blue-200 hover:bg-blue-100",
  gourmand: "bg-amber-50 border-amber-200 hover:bg-amber-100",
}

const noteTermMap: Record<string, string> = {
  rose: "Rosa",
  jasmine: "Jasmim",
  iris: "Íris",
  tuberose: "Tuberosa",
  violet: "Violeta",
  lily: "Lírio",
  peony: "Peônia",
  sandalwood: "Sândalo",
  cedar: "Cedro",
  bergamot: "Bergamota",
  lemon: "Limão",
  grapefruit: "Toranja",
  orange: "Laranja",
  mandarin: "Mandarina",
  vanilla: "Baunilha",
  amber: "Âmbar",
  musk: "Almíscar",
  mint: "Hortelã",
  cinnamon: "Canela",
  ginger: "Gengibre",
  saffron: "Açafrão",
  pear: "Pera",
  peach: "Pêssego",
  pineapple: "Abacaxi",
  cherry: "Cereja",
  plum: "Ameixa",
  grass: "Grama",
  ocean: "Oceano",
  rain: "Chuva",
  seaweed: "Algas marinhas",
  coffee: "Café",
  chocolate: "Chocolate",
  caramel: "Caramelo",
  honey: "Mel",
  almond: "Amêndoa",
  coconut: "Coco",
}

const translateNoteName = (name: string) => {
  const direct = noteTermMap[name.toLowerCase()]
  if (direct) return direct
  return name
    .split(" ")
    .map((word) => noteTermMap[word.toLowerCase()] ?? word)
    .join(" ")
}

const descriptionTermMap: Record<string, string> = {
  the: "a",
  queen: "rainha",
  of: "de",
  flowers: "flores",
  brings: "traz",
  rich: "rico",
  sweet: "doce",
  sensual: "sensual",
  elegant: "elegante",
  powdery: "atalcado",
  intense: "intenso",
  creamy: "cremoso",
  fresh: "fresco",
  bright: "vibrante",
  warm: "quente",
  dry: "seco",
  dark: "escuro",
  soft: "suave",
  light: "leve",
  cool: "refrescante",
  clean: "limpo",
  airy: "aéreo",
  sparkling: "cintilante",
  zesty: "vivo",
  tart: "ácido",
  juicy: "suculento",
  bitter: "amargo",
  uplifting: "revigorante",
  comforting: "aconchegante",
  enveloping: "envolvente",
  woody: "amadeirado",
  floral: "floral",
  citrus: "cítrico",
  spicy: "especiado",
  fruity: "frutado",
  earthy: "terroso",
  resinous: "resinoso",
  aromatic: "aromático",
  animalic: "animálico",
  medicinal: "medicinal",
  smoky: "defumado",
  leathery: "couroso",
  balsamic: "balsâmico",
  marine: "marinho",
  aquatic: "aquático",
  ozonic: "ozônico",
  green: "verde",
  dewy: "orvalhado",
  delicate: "delicado",
  innocent: "inocente",
  romantic: "romântico",
  exotic: "exótico",
  mysterious: "misterioso",
  honeyed: "melado",
  milky: "lácteo",
  buttery: "amanteigado",
  peppery: "apimentado",
  metallic: "metálico",
  watery: "aquoso",
  refreshing: "refrescante",
  soapy: "ensaboado",
  qualities: "qualidades",
  quality: "qualidade",
  facets: "facetas",
  undertones: "subtons",
  nuances: "nuances",
  notes: "notas",
  note: "nota",
  resin: "resina",
  wood: "madeira",
  root: "raiz",
  blossom: "flor",
  leaves: "folhas",
  orange: "laranja",
  bitterorange: "laranja-amarga",
  and: "e",
  with: "com",
  like: "semelhante",
  slightly: "levemente",
}

const translateNoteDescription = (description: string) => {
  return description.replace(/\b[a-zA-Z-]+\b/g, (token) => {
    const normalized = token.toLowerCase()
    const compact = normalized.replace(/-/g, "")
    return descriptionTermMap[normalized] ?? descriptionTermMap[compact] ?? token
  })
}

export default function NotesPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<NotesCategoryFilter>("all")

  const validCategoryValues = useMemo(
    () =>
      new Set<string>(
        categories.filter((c) => c.value !== "all").map((c) => c.value),
      ),
    [],
  )

  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat !== null && validCategoryValues.has(cat)) {
      setSelectedCategory(cat as NotesCategoryFilter)
    }
  }, [searchParams, validCategoryValues])

  const noteCatalogCounts = useMemo(() => {
    const map = new Map<string, number>()
    for (const n of notes) {
      map.set(n.id, getCatalogPerfumeCountForNote(n))
    }
    return map
  }, [])

  const filteredNotes = useMemo(() => {
    let result = [...notes]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (n) =>
          n.name.toLowerCase().includes(query) ||
          n.description.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((n) => n.category === selectedCategory)
    }

    result.sort(
      (a, b) =>
        (noteCatalogCounts.get(b.id) ?? 0) - (noteCatalogCounts.get(a.id) ?? 0),
    )

    return result
  }, [searchQuery, selectedCategory, noteCatalogCounts])

  // Group notes by category
  const groupedNotes = useMemo(() => {
    if (selectedCategory !== "all") {
      return { [selectedCategory]: filteredNotes }
    }

    const groups: { [key: string]: typeof notes } = {}
    filteredNotes.forEach((note) => {
      if (!groups[note.category]) {
        groups[note.category] = []
      }
      groups[note.category].push(note)
    })
    return groups
  }, [filteredNotes, selectedCategory])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-secondary py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
              Notas olfativas
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-pretty">
              Explore os “blocos de construção” da perfumaria. Das florais delicadas aos orientais intensos,
              descubra as notas por trás dos seus perfumes favoritos.
            </p>
          </div>
        </div>

        {/* Search & Categories */}
        <div className="border-b border-border bg-card sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar notas..."
                className="pl-10 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.value
                      ? "bg-primary text-primary-foreground"
                      : `${category.color} text-foreground hover:opacity-80`
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p className="mt-4 text-sm text-muted-foreground">
              Mostrando {filteredNotes.length} notas
            </p>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {Object.keys(groupedNotes).length > 0 ? (
            <div className="space-y-12">
              {Object.entries(groupedNotes).map(([category, categoryNotes]) => (
                <div key={category}>
                  {selectedCategory === "all" && (
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 capitalize">
                      {categoryLabels[category] ?? category}
                    </h2>
                  )}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryNotes.map((note) => (
                      <Link
                        key={note.id}
                        href={`/notes/${note.slug}`}
                        className={`group rounded-xl border p-5 transition-all duration-300 ${
                          categoryColors[note.category] || "bg-card border-border hover:bg-secondary"
                        }`}
                      >
                        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                          {translateNoteName(note.name)}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {translateNoteDescription(note.description)}
                        </p>
                        <p className="mt-3 text-sm font-medium text-foreground">
                          {(noteCatalogCounts.get(note.id) ?? 0).toLocaleString()} Perfumes
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Nenhuma nota encontrada com esses filtros.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
