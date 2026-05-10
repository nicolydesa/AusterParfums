"use client"

import { use } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PerfumeCard } from "@/components/perfume-card"
import { notes, getPerfumesWithNote, getCatalogPerfumeCountForNote } from "@/lib/data"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPerfumeImage } from "@/lib/perfume-images"

const categoryColors: { [key: string]: string } = {
  floral: "bg-pink-100 text-pink-800",
  amadeirado: "bg-amber-100 text-amber-800",
  citrico: "bg-yellow-100 text-yellow-800",
  oriental: "bg-orange-100 text-orange-800",
  fresco: "bg-cyan-100 text-cyan-800",
  especiado: "bg-red-100 text-red-800",
  frutado: "bg-rose-100 text-rose-800",
  verde: "bg-emerald-100 text-emerald-800",
  aquatico: "bg-blue-100 text-blue-800",
  gourmand: "bg-amber-100 text-amber-800",
}

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

export default function NoteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  
  const note = notes.find((n) => n.slug === slug)
  
  if (!note) {
    notFound()
  }

  const relatedPerfumes = getPerfumesWithNote(note)
  const catalogCount = relatedPerfumes.length

  // Find related notes in the same category
  const relatedNotes = notes.filter(
    (n) => n.category === note.category && n.id !== note.id
  ).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/notes" className="hover:text-foreground transition-colors">
                Notas
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href={`/notes?category=${note.category}`}
                className="hover:text-foreground transition-colors"
              >
                {categoryLabels[note.category] ?? note.category}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{translateNoteName(note.name)}</span>
            </nav>
          </div>
        </div>

        {/* Note Header */}
        <section className="bg-secondary py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  categoryColors[note.category] || "bg-muted text-muted-foreground"
                }`}
              >
                {categoryLabels[note.category] ?? note.category}
              </span>
              <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
                {translateNoteName(note.name)}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {translateNoteDescription(note.description)}
              </p>
              <p className="mt-4 text-foreground font-medium">
                {catalogCount === 0
                  ? "Nenhum perfume no catálogo lista essa nota ainda"
                  : `Presente em ${catalogCount.toLocaleString()} perfume${catalogCount === 1 ? "" : "s"} no catálogo`}
              </p>
            </div>
          </div>
        </section>

        {/* Perfumes with this note */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Perfumes com {translateNoteName(note.name)}
            </h2>

            {relatedPerfumes.length > 0 ? (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {relatedPerfumes.map((perfume) => (
                  <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
                    <PerfumeCard
                      id={perfume.id}
                      name={perfume.name}
                      brand={perfume.brand}
                      image={getPerfumeImage(perfume)}
                      rating={perfume.rating}
                      reviewCount={perfume.reviewCount}
                      topNotes={perfume.topNotes}
                      year={perfume.year}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-8 text-center py-16 bg-card rounded-xl border border-border">
                <p className="text-muted-foreground">Ainda não encontramos perfumes com essa nota na base.</p>
              </div>
            )}
          </div>
        </section>

        {/* Related Notes */}
        {relatedNotes.length > 0 && (
          <section className="py-12 lg:py-16 bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Notas relacionadas — {categoryLabels[note.category] ?? note.category}
              </h2>
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedNotes.map((relatedNote) => (
                  <Link
                    key={relatedNote.id}
                    href={`/notes/${relatedNote.slug}`}
                    className="group bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      {translateNoteName(relatedNote.name)}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {translateNoteDescription(relatedNote.description)}
                    </p>
                    <p className="mt-3 text-sm font-medium text-foreground">
                      {getCatalogPerfumeCountForNote(relatedNote).toLocaleString()} perfumes no catálogo
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
