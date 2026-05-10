"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Dna, Plus, X, Search, Sparkles, Heart, Star, Clock, Wind } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { perfumes, type Perfume } from "@/lib/data"
import { getPerfumeImage } from "@/lib/perfume-images"

interface Collection {
  id: string
  name: string
  perfumes: Perfume[]
}

function PerfumeSelector({ 
  onSelect, 
  excludeIds,
  trigger 
}: { 
  onSelect: (perfume: Perfume) => void
  excludeIds: string[]
  trigger: React.ReactNode 
}) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

  const filteredPerfumes = perfumes
    .filter(p => !excludeIds.includes(p.id))
    .filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Adicione um perfume que você tem ou ama</DialogTitle>
        </DialogHeader>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar perfumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {filteredPerfumes.map(perfume => (
            <button
              key={perfume.id}
              onClick={() => { onSelect(perfume); setOpen(false); setSearch("") }}
              className="w-full flex items-center gap-4 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all text-left"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={getPerfumeImage(perfume)} alt={perfume.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{perfume.brand}</p>
                <p className="font-medium text-foreground">{perfume.name}</p>
              </div>
              <Star className="h-4 w-4 fill-primary text-primary" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function RadarChart({ data }: { data: { label: string; value: number }[] }) {
  const size = 300
  const center = size / 2
  const radius = 100
  const angleStep = (2 * Math.PI) / data.length

  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2
    const r = (d.value / 100) * radius
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      labelX: center + (radius + 35) * Math.cos(angle),
      labelY: center + (radius + 35) * Math.sin(angle),
      label: d.label,
      value: d.value
    }
  })

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  return (
    <div className="flex justify-center items-center py-4">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[350px] overflow-visible">
        {/* Grid circles */}
        {[25, 50, 75, 100].map(level => (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={(level / 100) * radius}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.1}
            strokeWidth={1}
          />
        ))}
        
        {/* Axis lines */}
        {points.map((p, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(i * angleStep - Math.PI / 2)}
            y2={center + radius * Math.sin(i * angleStep - Math.PI / 2)}
            stroke="currentColor"
            strokeOpacity={0.1}
            strokeWidth={1}
          />
        ))}

        {/* Data polygon */}
        <path
          d={pathD}
          fill="hsl(var(--primary))"
          fillOpacity={0.15}
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          className="transition-all duration-500 ease-in-out"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="hsl(var(--primary))"
            className="transition-all duration-500 ease-in-out"
          />
        ))}

        {/* Labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.labelX}
            y={p.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-[11px] font-semibold uppercase tracking-wider"
          >
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  )
}

function calculateDNA(collection: Perfume[]) {
  if (collection.length === 0) return null

  const noteFrequency: Record<string, number> = {}
  const accordFrequency: Record<string, number> = {}
  let totalLongevity = 0
  let totalSillage = 0
  let totalRating = 0
  const genderCount = { men: 0, women: 0, unisex: 0 }

  collection.forEach(perfume => {
    [...perfume.topNotes, ...perfume.middleNotes, ...perfume.baseNotes].forEach(note => {
      noteFrequency[note] = (noteFrequency[note] || 0) + 1
    })
    perfume.accords.forEach(accord => {
      accordFrequency[accord] = (accordFrequency[accord] || 0) + 1
    })
    totalLongevity += perfume.longevity
    totalSillage += perfume.sillage
    totalRating += perfume.rating
    genderCount[perfume.gender]++
  })

  const topNotes = Object.entries(noteFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([note, count]) => ({ note, count, percentage: Math.round((count / collection.length) * 100) }))

  const topAccords = Object.entries(accordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([accord, count]) => ({ accord, count, percentage: Math.round((count / collection.length) * 100) }))

  const categories = {
    Amadeirado: 0,
    Floral: 0,
    Fresco: 0,
    Oriental: 0,
    Especiado: 0,
    Doce: 0,
  }

  collection.forEach(perfume => {
    perfume.accords.forEach(accord => {
      const lower = accord.toLowerCase()
      if (lower.includes('woody') || lower.includes('oud') || lower.includes('amadeirado')) categories.Amadeirado += 15
      if (lower.includes('floral') || lower.includes('rose') || lower.includes('rosa')) categories.Floral += 15
      if (lower.includes('fresh') || lower.includes('citrus') || lower.includes('aquatic') || lower.includes('fresco')) categories.Fresco += 15
      if (lower.includes('oriental') || lower.includes('amber') || lower.includes('âmbar')) categories.Oriental += 15
      if (lower.includes('spicy') || lower.includes('warm') || lower.includes('especiado')) categories.Especiado += 15
      if (lower.includes('sweet') || lower.includes('gourmand') || lower.includes('vanilla') || lower.includes('doce')) categories.Doce += 15
    })
  })

  const maxCategory = Math.max(...Object.values(categories))
  Object.keys(categories).forEach(key => {
    categories[key as keyof typeof categories] = Math.round((categories[key as keyof typeof categories] / maxCategory) * 100) || 0
  })

  const genderLabels: Record<string, string> = { men: "Masculino", women: "Feminino", unisex: "Unissex" }
  const topGender = Object.entries(genderCount).sort((a, b) => b[1] - a[1])[0][0]

  return {
    topNotes,
    topAccords,
    avgLongevity: Math.round((totalLongevity / collection.length) * 10) / 10,
    avgSillage: Math.round((totalSillage / collection.length) * 10) / 10,
    avgRating: Math.round((totalRating / collection.length) * 10) / 10,
    genderPreference: genderLabels[topGender],
    categories,
    totalPerfumes: collection.length
  }
}

export default function DNAPage() {
  const [myCollection, setMyCollection] = useState<Perfume[]>([])

  const addToCollection = (perfume: Perfume) => {
    if (!myCollection.find(p => p.id === perfume.id)) {
      setMyCollection(prev => [...prev, perfume])
    }
  }

  const removeFromCollection = (id: string) => {
    setMyCollection(prev => prev.filter(p => p.id !== id))
  }

  const dna = calculateDNA(myCollection)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Dna className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            Seu DNA Olfativo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Adicione perfumes que você tem ou ama para analisarmos seu perfil e identificar suas notas assinatura.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Collection Builder */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-lg font-semibold">Minha Coleção</h2>
                  <span className="text-sm text-muted-foreground">{myCollection.length} {myCollection.length === 1 ? 'fragrância' : 'fragrâncias'}</span>
                </div>

                {myCollection.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground mb-4">Adicione perfumes que você tem ou ama</p>
                  </div>
                ) : (
                  <div className="space-y-2 mb-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {myCollection.map(perfume => (
                      <div key={perfume.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 group">
                        <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                          <Image src={getPerfumeImage(perfume)} alt={perfume.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground truncate">{perfume.brand}</p>
                          <p className="text-sm font-medium truncate">{perfume.name}</p>
                        </div>
                        <button
                          onClick={() => removeFromCollection(perfume.id)}
                          className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition-all"
                        >
                          <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <PerfumeSelector
                  onSelect={addToCollection}
                  excludeIds={myCollection.map(p => p.id)}
                  trigger={
                    <Button variant="outline" className="w-full gap-2">
                      <Plus className="h-4 w-4" />
                      Adicionar Perfume
                    </Button>
                  }
                />

                {myCollection.length > 0 && (
                  <Button 
                    variant="ghost" 
                    className="w-full mt-2 text-muted-foreground"
                    onClick={() => setMyCollection([])}
                  >
                    Limpar Tudo
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Quick Add Suggestions */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <p className="text-sm font-medium mb-3">Populares para adicionar</p>
                <div className="flex flex-wrap gap-2">
                  {perfumes.slice(0, 6).filter(p => !myCollection.find(c => c.id === p.id)).map(perfume => (
                    <button
                      key={perfume.id}
                      onClick={() => addToCollection(perfume)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20"
                    >
                      + {perfume.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* DNA Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {!dna ? (
              <Card>
                <CardContent className="py-24 text-center">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50 animate-pulse" />
                  <h2 className="font-serif text-xl font-semibold mb-2">Seu DNA Te Espera</h2>
                  <p className="text-muted-foreground">Adicione ao menos uma fragrância para descobrir seu perfil olfativo</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Scent Profile Radar */}
                <Card className="overflow-hidden">
                  <CardContent className="p-8">
                    <h2 className="font-serif text-2xl font-semibold mb-8 text-center">Seu Perfil Olfativo</h2>
                    <RadarChart 
                      data={Object.entries(dna.categories).map(([label, value]) => ({ label, value }))} 
                    />
                  </CardContent>
                </Card>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Star className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{dna.avgRating}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Nota Média</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{dna.avgLongevity}h</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Fixação Média</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Wind className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{dna.avgSillage}/10</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Projeção Média</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Heart className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{dna.genderPreference}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Preferência</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Signature Notes */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-serif text-xl font-semibold mb-6">Suas Notas Assinatura</h2>
                    <div className="space-y-4">
                      {dna.topNotes.map(({ note, percentage }, index) => (
                        <div key={note} className="flex items-center gap-4 group">
                          <span className="w-6 text-center font-bold text-primary/40 group-hover:text-primary transition-colors">{index + 1}</span>
                          <span className="flex-1 font-medium">{note}</span>
                          <div className="w-32 md:w-48 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right font-mono">{percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Dominant Accords */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-serif text-xl font-semibold mb-6">Acordes Dominantes</h2>
                    <div className="flex flex-wrap gap-3">
                      {dna.topAccords.map(({ accord, percentage }) => (
                        <Badge 
                          key={accord} 
                          className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                          {accord}
                          <span className="ml-2 opacity-60 font-mono">{percentage}%</span>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h2 className="font-serif text-xl font-semibold">Recomendados Para Você</h2>
                    </div>
                    <p className="text-muted-foreground mb-6 text-sm">
                      Com base no seu DNA, estas fragrâncias podem combinar perfeitamente com seu gosto.
                    </p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {perfumes
                        .filter(p => !myCollection.find(c => c.id === p.id))
                        .slice(0, 3)
                        .map(perfume => (
                          <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-card hover:shadow-lg transition-all border border-border/50 hover:border-primary/30 group">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <Image src={getPerfumeImage(perfume)} alt={perfume.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-muted-foreground truncate uppercase">{perfume.brand}</p>
                                <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{perfume.name}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Link href="/discover/similar">
                        <Button variant="outline" className="rounded-full px-8">Explorar Mais Resultados</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}