"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MessageSquare, Sparkles } from "lucide-react"
import { perfumes, type Perfume } from "@/lib/data"
import { getPerfumeImage } from "@/lib/perfume-images"
import { PerfumeCard } from "@/components/perfume-card"

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .trim()
}

/** Frases-chave → vetores olfativos (PT), usadas só para rotular a tradução; o match real usa o catálogo. */
const keywordMappings: Record<string, { notes: string[]; moods: string[]; accords: string[] }> = {
  floresta: { notes: ["Vetiver", "Cedro", "Musgo de Carvalho"], moods: ["natural", "terroso"], accords: ["amadeirado", "verde"] },
  bosque: { notes: ["Pinho", "Cedro", "Vetiver"], moods: ["silvestre"], accords: ["amadeirado"] },
  chuva: { notes: ["Petitgrain", "Notas Ozônicas"], moods: ["limpo", "refrescante"], accords: ["fresco", "aquático"] },
  praia: { notes: ["Sal Marinho", "Coco", "Flor de Laranjeira"], moods: ["leve", "solar"], accords: ["aquático", "frutado"] },
  verao: { notes: ["Bergamota", "Limão", "Flor de Laranjeira"], moods: ["solar", "descomplicado"], accords: ["cítrico", "fresco"] },
  carro: { notes: ["Couro", "Cedro"], moods: ["moderno"], accords: ["couro", "amadeirado"] },
  lareira: { notes: ["Cedro", "Baunilha", "Incenso"], moods: ["aconchegante"], accords: ["amadeirado", "defumado"] },
  livro: { notes: ["Baunilha", "Íris", "Café"], moods: ["tranquilo"], accords: ["baunilha", "atalcado"] },
  jazz: { notes: ["Tabaco", "Couro", "Rum"], moods: ["noturno"], accords: ["defumado", "especiado quente"] },
  bar: { notes: ["Rum", "Baunilha", "Couro"], moods: ["noturno"], accords: ["oriental"] },
  paris: { notes: ["Rosa", "Íris", "Violeta"], moods: ["elegante"], accords: ["floral", "atalcado"] },
  cafe: { notes: ["Café", "Baunilha", "Caramelo"], moods: ["confortável"], accords: ["doce", "café"] },
  doce: { notes: ["Baunilha", "Fava Tonka", "Pralinê"], moods: ["aconchegante"], accords: ["doce", "baunilha"] },
  frescor: { notes: ["Bergamota", "Limão", "Hortelã"], moods: ["limpo"], accords: ["cítrico", "fresco"] },
  fresco: { notes: ["Toranja", "Hortelã", "Lavanda"], moods: ["energético"], accords: ["fresco", "cítrico"] },
  limpo: { notes: ["Aldeídos", "Limão", "Lavanda"], moods: ["minimalista"], accords: ["fresco"] },
  sedutor: { notes: ["Jasmim", "Baunilha", "Âmbar"], moods: ["noturno"], accords: ["oriental", "floral"] },
  romantico: { notes: ["Rosa", "Peônia", "Baunilha"], moods: ["suave"], accords: ["floral", "doce"] },
  noite: { notes: ["Oud", "Âmbar", "Baunilha"], moods: ["intenso"], accords: ["oriental", "amadeirado"] },
  trabalho: { notes: ["Lavanda", "Vetiver", "Bergamota"], moods: ["contido"], accords: ["aromático", "fresco"] },
  escritorio: { notes: ["Cedro", "Bergamota", "Íris"], moods: ["elegante"], accords: ["amadeirado", "fresco"] },
  formal: { notes: ["Couro", "Vetiver", "Íris"], moods: ["sério"], accords: ["couro", "amadeirado"] },
  esportivo: { notes: ["Toranja", "Hortelã", "Marinha"], moods: ["dinâmico"], accords: ["fresco", "cítrico"] },
  masculino: { notes: ["Vetiver", "Cedro", "Couro"], moods: ["marcante"], accords: ["amadeirado", "aromático"] },
  feminino: { notes: ["Jasmim", "Rosa", "Baunilha"], moods: ["floral"], accords: ["floral", "doce"] },
  amadeirado: { notes: ["Sândalo", "Cedro", "Vetiver"], moods: ["estruturado"], accords: ["amadeirado"] },
  floral: { notes: ["Rosa", "Jasmim", "Íris"], moods: ["delicado"], accords: ["floral"] },
  citrico: { notes: ["Bergamota", "Limão", "Toranja"], moods: ["vivo"], accords: ["cítrico"] },
  especiado: { notes: ["Cardamomo", "Pimenta", "Canela"], moods: ["quente"], accords: ["especiado quente"] },
  oriental: { notes: ["Baunilha", "Âmbar", "Incenso"], moods: ["envolvente"], accords: ["oriental"] },
  aquatico: { notes: ["Marinha", "Melão", "Bambu"], moods: ["leve"], accords: ["aquático", "fresco"] },
  musk: { notes: ["Almíscar", "Âmbar Cinzento"], moods: ["íntimo"], accords: ["almiscarado"] },
  almiscar: { notes: ["Almíscar", "Baunilha"], moods: ["suave"], accords: ["almiscarado"] },
  vanila: { notes: ["Baunilha", "Fava Tonka"], moods: ["doce"], accords: ["baunilha", "doce"] },
  baunilha: { notes: ["Baunilha", "Fava Tonka"], moods: ["aconchegante"], accords: ["baunilha"] },
  tabaco: { notes: ["Tabaco", "Couro", "Fava Tonka"], moods: ["noturno"], accords: ["defumado"] },
  couro: { notes: ["Couro", "Bétula", "Jasmim"], moods: ["audacioso"], accords: ["couro"] },
  defumado: { notes: ["Incenso", "Oud", "Cipreste"], moods: ["misterioso"], accords: ["defumado"] },
  frutado: { notes: ["Abacaxi", "Maçã", "Groselha Preta"], moods: ["alegre"], accords: ["frutado"] },
  praiano: { notes: ["Sal Marinho", "Coco", "Flor de Laranjeira"], moods: ["relax"], accords: ["aquático"] },
}

type Interpretation = {
  notes: string[]
  moods: string[]
  accords: string[]
  matchedKeywords: string[]
}

function interpretDescription(description: string): Interpretation {
  const lower = normalize(description)
  const matchedKeywords: string[] = []
  const notes: string[] = []
  const moods: string[] = []
  const accords: string[] = []

  for (const [keyword, mapping] of Object.entries(keywordMappings)) {
    if (lower.includes(keyword)) {
      matchedKeywords.push(keyword)
      notes.push(...mapping.notes)
      moods.push(...mapping.moods)
      accords.push(...mapping.accords)
    }
  }

  if (notes.length === 0) {
    const fallback = {
      notes: ["Bergamota", "Jasmim", "Cedro"],
      moods: ["versátil"],
      accords: ["fresco", "floral"],
      matchedKeywords: [] as string[],
    }
    return fallback
  }

  return {
    notes: [...new Set(notes)].slice(0, 8),
    moods: [...new Set(moods)].slice(0, 5),
    accords: [...new Set(accords)].slice(0, 6),
    matchedKeywords,
  }
}

function perfumeTextBlob(p: Perfume) {
  const layers = [...p.topNotes, ...p.middleNotes, ...p.baseNotes].join(" ")
  const acc = p.accords.join(" ")
  return normalize(`${layers} ${acc} ${p.description}`)
}

function layerBlob(p: Perfume) {
  return [...p.topNotes, ...p.middleNotes, ...p.baseNotes].map(normalize).join(" ")
}

function accordBlob(p: Perfume) {
  return p.accords.map(normalize).join(" ")
}

/** Pontua pelo overlap real com notas e acordes do catálogo (não só nome da marca). */
function scorePerfume(p: Perfume, interpretation: Interpretation): number {
  let score = 0
  const lb = layerBlob(p)
  const ab = accordBlob(p)
  const blob = perfumeTextBlob(p)

  for (const raw of interpretation.notes) {
    const n = normalize(raw)
    if (n.length < 2) continue
    if (lb.includes(n)) score += 5
    else if (
      [...p.topNotes, ...p.middleNotes, ...p.baseNotes].some(
        (note) => normalize(note).includes(n) || n.includes(normalize(note)),
      )
    ) {
      score += 3
    }
  }

  for (const raw of interpretation.accords) {
    const a = normalize(raw)
    if (a.length < 2) continue
    if (ab.includes(a)) score += 4
    else if (p.accords.some((ac) => normalize(ac).includes(a) || a.includes(normalize(ac)))) score += 2.5
  }

  for (const raw of interpretation.moods) {
    const m = normalize(raw)
    if (m.length >= 3 && blob.includes(m)) score += 1.2
  }

  score += p.rating * 0.35
  return score
}

function findMatchingPerfumes(interpretation: Interpretation): { perfume: Perfume; score: number }[] {
  const scored = perfumes.map((perfume) => ({
    perfume,
    score: scorePerfume(perfume, interpretation),
  }))

  scored.sort((a, b) => b.score - a.score)

  const meaningful = scored.filter((s) => s.score >= 4)
  const pool = meaningful.length >= 4 ? meaningful : scored

  return pool.slice(0, 6)
}

const examplePrompts = [
  "Quero cheirar como o interior de um carro novo",
  "Caminhando por uma floresta depois da chuva",
  "Noite aconchegante perto da lareira com um livro",
  "Manhã fresca na praia",
  "Um cavalheiro sofisticado em um bar de jazz",
  "Algo fresco e discreto para o trabalho",
]

const quickScenarios: { label: string; text: string }[] = [
  { label: "Reunião / escritório", text: "Algo fresco, limpo e discreto para trabalhar o dia inteiro no escritório." },
  { label: "Encontro à noite", text: "Perfume sedutor e elegante para um jantar romântico à noite." },
  { label: "Praia / verão", text: "Cheiro de praia e verão, leve, salgado e refrescante." },
]

export default function ScentTranslatorPage() {
  const [description, setDescription] = useState("")
  const [interpretation, setInterpretation] = useState<Interpretation | null>(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [hasTranslated, setHasTranslated] = useState(false)

  const handleTranslate = () => {
    const trimmed = description.trim()
    if (!trimmed) return
    setIsTranslating(true)
    window.setTimeout(() => {
      setInterpretation(interpretDescription(trimmed))
      setIsTranslating(false)
      setHasTranslated(true)
    }, 450)
  }

  const matchingPerfumes = useMemo(
    () => (interpretation ? findMatchingPerfumes(interpretation) : []),
    [interpretation],
  )

  const maxScore = Math.max(...matchingPerfumes.map((m) => m.score), 1)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="bg-secondary border-b border-border py-10 lg:py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground" asChild>
              <Link href="/discover" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar para Descobrir
              </Link>
            </Button>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageSquare className="h-7 w-7" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground text-balance">
                    Tradutor de perfume
                  </h1>
                  <Badge variant="secondary" className="font-normal">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Sugestões do catálogo
                  </Badge>
                </div>
                <p className="mt-3 text-muted-foreground max-w-2xl text-pretty">
                  Descreva uma situação, um clima ou como você quer se sentir. Traduzimos isso em famílias olfativas e
                  indicamos perfumes do nosso catálogo que mais combinam com as notas e acordes detectados.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 space-y-6">
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="font-serif text-xl">O que você está imaginando?</CardTitle>
                  <CardDescription>
                    Quanto mais específico (local, clima, ocasião), melhor a tradução nas notas abaixo.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex.: Tarde em Paris, café na calçada e rosas frescas…"
                    className="min-h-[140px] resize-y bg-background text-base"
                  />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Exemplos</p>
                    <div className="flex flex-wrap gap-2">
                      {examplePrompts.map((ex) => (
                        <button
                          key={ex}
                          type="button"
                          onClick={() => setDescription(ex)}
                          className="text-left text-xs rounded-full border border-border bg-card px-3 py-1.5 text-foreground hover:bg-secondary transition-colors max-w-full"
                        >
                          {ex}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={handleTranslate}
                    disabled={!description.trim() || isTranslating}
                    className="w-full sm:w-auto"
                    size="lg"
                  >
                    {isTranslating ? "Analisando…" : "Gerar sugestões"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">Cenários rápidos</CardTitle>
                  <CardDescription>Toque para preencher o texto e gerar de novo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickScenarios.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setDescription(s.text)}
                      className="w-full rounded-xl border border-border bg-card p-4 text-left text-sm transition-colors hover:bg-secondary"
                    >
                      <span className="font-medium text-foreground">{s.label}</span>
                      <span className="mt-1 block text-muted-foreground line-clamp-2">{s.text}</span>
                    </button>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-border bg-muted/30">
                <CardContent className="pt-6 text-sm text-muted-foreground leading-relaxed">
                  As sugestões combinam palavras da sua descrição com as{" "}
                  <strong className="text-foreground font-medium">notas de pirâmide</strong> e{" "}
                  <strong className="text-foreground font-medium">acordes</strong> cadastrados em cada perfume — não é
                  IA generativa; por isso os resultados ficam ligados ao que existe no catálogo.
                </CardContent>
              </Card>
            </div>
          </div>

          {hasTranslated && interpretation && (
            <section className="mt-14 space-y-10 border-t border-border pt-12">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">Tradução olfativa</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {interpretation.matchedKeywords.length > 0 ? (
                    <>
                      Detectamos estes temas na sua frase:{" "}
                      <span className="text-foreground font-medium">
                        {interpretation.matchedKeywords.join(", ")}
                      </span>
                      .
                    </>
                  ) : (
                    <>Não encontramos palavras-chave conhecidas; usamos um perfil equilibrado neutro para buscar no catálogo.</>
                  )}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Notas sugeridas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {interpretation.notes.map((n) => (
                      <Badge key={n} variant="outline">
                        {n}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Clima / uso
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {interpretation.moods.map((m) => (
                      <Badge key={m} variant="secondary">
                        {m}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Acordes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {interpretation.accords.map((a) => (
                      <Badge key={a} variant="outline" className="bg-muted/50">
                        {a}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-6">Perfumes sugeridos</h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {matchingPerfumes.map(({ perfume, score }) => {
                    const matchPct = Math.round(Math.min(100, (score / maxScore) * 100))
                    return (
                      <div key={perfume.id} className="relative">
                        <Badge className="absolute left-3 top-3 z-10 shadow-sm" variant="secondary">
                          {matchPct}% compatível
                        </Badge>
                        <Link href={`/perfumes/${perfume.id}`} className="block">
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
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
