"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, X, Search, Star, Clock, Wind, ArrowLeftRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { perfumes, type Perfume } from "@/lib/data"
import { getPerfumeImage } from "@/lib/perfume-images"

const MAX_COMPARE = 4

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

  const filteredPerfumes = useMemo(() => {
    return perfumes
      .filter(p => !excludeIds.includes(p.id))
      .filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      )
  }, [search, excludeIds])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Selecione um perfume</DialogTitle>
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
              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={getPerfumeImage(perfume)} alt={perfume.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{perfume.brand}</p>
                <p className="font-medium text-foreground">{perfume.name}</p>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>{perfume.rating}</span>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function StatBar({ value, max = 10, color = "bg-primary" }: { value: number; max?: number; color?: string }) {
  const percentage = (value / max) * 100
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-sm font-medium w-8">{value}</span>
    </div>
  )
}

function NoteComparison({ perfumes: selectedPerfumes }: { perfumes: Perfume[] }) {
  // Collect all notes from selected perfumes
  const allNotes = useMemo(() => {
    const noteMap: Record<string, { note: string; perfumeIds: Set<string>; layer: string }> = {}
    
    selectedPerfumes.forEach(perfume => {
      perfume.topNotes.forEach(note => {
        const key = note.toLowerCase()
        if (!noteMap[key]) noteMap[key] = { note, perfumeIds: new Set(), layer: "top" }
        noteMap[key].perfumeIds.add(perfume.id)
      })
      perfume.middleNotes.forEach(note => {
        const key = note.toLowerCase()
        if (!noteMap[key]) noteMap[key] = { note, perfumeIds: new Set(), layer: "middle" }
        noteMap[key].perfumeIds.add(perfume.id)
      })
      perfume.baseNotes.forEach(note => {
        const key = note.toLowerCase()
        if (!noteMap[key]) noteMap[key] = { note, perfumeIds: new Set(), layer: "base" }
        noteMap[key].perfumeIds.add(perfume.id)
      })
    })

    return Object.values(noteMap)
      .sort((a, b) => b.perfumeIds.size - a.perfumeIds.size)
  }, [selectedPerfumes])

  const sharedNotes = allNotes.filter(n => n.perfumeIds.size > 1)
  const uniqueNotes = allNotes.filter(n => n.perfumeIds.size === 1)

  return (
    <div className="space-y-6">
      {sharedNotes.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Notas em comum ({sharedNotes.length})</h3>
          <div className="flex flex-wrap gap-2">
            {sharedNotes.map(({ note, perfumeIds }) => (
              <Badge key={note} className="bg-green-100 text-green-800 border-green-200">
                {note}
                <span className="ml-1 opacity-70">({perfumeIds.size})</span>
              </Badge>
            ))}
          </div>
        </div>
      )}
      {uniqueNotes.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Notas únicas</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueNotes.map(({ note }) => (
              <Badge key={note} variant="outline">
                {note}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ComparePage() {
  const [selectedPerfumes, setSelectedPerfumes] = useState<Perfume[]>([])

  const addPerfume = (perfume: Perfume) => {
    if (selectedPerfumes.length < MAX_COMPARE && !selectedPerfumes.find(p => p.id === perfume.id)) {
      setSelectedPerfumes(prev => [...prev, perfume])
    }
  }

  const removePerfume = (id: string) => {
    setSelectedPerfumes(prev => prev.filter(p => p.id !== id))
  }

  const excludeIds = selectedPerfumes.map(p => p.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <ArrowLeftRight className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            Comparar fragrâncias
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare até 4 fragrâncias lado a lado. Analise notas e desempenho para achar a melhor combinação.
          </p>
        </div>

        {/* Selection Area */}
        {selectedPerfumes.length === 0 ? (
          <Card className="mb-8">
            <CardContent className="py-16 text-center">
              <ArrowLeftRight className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h2 className="font-serif text-xl font-semibold mb-2">Comece a comparar</h2>
              <p className="text-muted-foreground mb-6">Adicione fragrâncias para comparar notas, fixação e muito mais</p>
              <PerfumeSelector 
                onSelect={addPerfume} 
                excludeIds={excludeIds}
                trigger={
                  <Button size="lg" className="gap-2">
                    <Plus className="h-5 w-5" />
                    Adicionar primeiro perfume
                  </Button>
                }
              />
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Comparison Grid */}
            <div className="mb-8">
              <div className={`grid gap-4 ${
                selectedPerfumes.length === 1 ? "grid-cols-1 max-w-md mx-auto" :
                selectedPerfumes.length === 2 ? "grid-cols-2" :
                selectedPerfumes.length === 3 ? "grid-cols-3" :
                "grid-cols-4"
              }`}>
                {selectedPerfumes.map(perfume => (
                  <Card key={perfume.id} className="relative">
                    <button
                      onClick={() => removePerfume(perfume.id)}
                      className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-background/80 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <CardContent className="p-4">
                      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                        <Image src={getPerfumeImage(perfume)} alt={perfume.name} fill className="object-cover" />
                      </div>
                      <p className="text-sm text-muted-foreground">{perfume.brand}</p>
                      <h3 className="font-serif font-semibold text-foreground mb-2">{perfume.name}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{perfume.rating}</span>
                        <span className="text-xs text-muted-foreground">({perfume.reviewCount.toLocaleString()})</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        <p><span className="text-muted-foreground">Ano:</span> {perfume.year}</p>
                        <p><span className="text-muted-foreground">Gênero:</span> <span className="capitalize">{perfume.gender}</span></p>
                        <p><span className="text-muted-foreground">Tipo:</span> {perfume.concentration}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add More Slot */}
                {selectedPerfumes.length < MAX_COMPARE && (
                  <PerfumeSelector
                    onSelect={addPerfume}
                    excludeIds={excludeIds}
                    trigger={
                      <Card className="cursor-pointer border-dashed hover:border-primary/50 hover:bg-muted/30 transition-all">
                        <CardContent className="h-full flex flex-col items-center justify-center p-6 text-center">
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                            <Plus className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <p className="text-sm font-medium text-muted-foreground">Adicionar perfume</p>
                          <p className="text-xs text-muted-foreground">{MAX_COMPARE - selectedPerfumes.length} vagas restantes</p>
                        </CardContent>
                      </Card>
                    }
                  />
                )}
              </div>
            </div>

            {/* Detailed Comparison */}
            {selectedPerfumes.length >= 2 && (
              <div className="space-y-8">
                {/* Performance Comparison */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-serif text-xl font-semibold mb-6 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Comparação de desempenho
                    </h2>
                    <div className="space-y-6">
                      {/* Longevity */}
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-4">Fixação (horas)</h3>
                        <div className="space-y-3">
                          {selectedPerfumes.map(perfume => (
                            <div key={perfume.id} className="flex items-center gap-4">
                              <span className="w-32 text-sm font-medium truncate">{perfume.name}</span>
                              <StatBar value={perfume.longevity} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sillage */}
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                          <Wind className="h-4 w-4" />
                          Projeção (sillage)
                        </h3>
                        <div className="space-y-3">
                          {selectedPerfumes.map(perfume => (
                            <div key={perfume.id} className="flex items-center gap-4">
                              <span className="w-32 text-sm font-medium truncate">{perfume.name}</span>
                              <StatBar value={perfume.sillage} color="bg-accent" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes Comparison */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-serif text-xl font-semibold mb-6">Comparação de notas</h2>
                    
                    {/* Individual Notes */}
                    <div className={`grid gap-6 mb-8 ${
                      selectedPerfumes.length === 2 ? "grid-cols-2" :
                      selectedPerfumes.length === 3 ? "grid-cols-3" :
                      "grid-cols-4"
                    }`}>
                      {selectedPerfumes.map(perfume => (
                        <div key={perfume.id}>
                          <h3 className="font-medium text-sm mb-4 truncate">{perfume.name}</h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Topo</p>
                              <div className="flex flex-wrap gap-1">
                                {perfume.topNotes.map(note => (
                                  <Badge key={note} variant="outline" className="text-xs bg-amber-50 border-amber-200">
                                    {note}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Corpo</p>
                              <div className="flex flex-wrap gap-1">
                                {perfume.middleNotes.map(note => (
                                  <Badge key={note} variant="outline" className="text-xs bg-rose-50 border-rose-200">
                                    {note}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Fundo</p>
                              <div className="flex flex-wrap gap-1">
                                {perfume.baseNotes.map(note => (
                                  <Badge key={note} variant="outline" className="text-xs bg-stone-100 border-stone-200">
                                    {note}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shared vs Unique */}
                    <div className="pt-6 border-t border-border">
                      <NoteComparison perfumes={selectedPerfumes} />
                    </div>
                  </CardContent>
                </Card>

                {/* Accords Comparison */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-serif text-xl font-semibold mb-6">Acordes</h2>
                    <div className={`grid gap-6 ${
                      selectedPerfumes.length === 2 ? "grid-cols-2" :
                      selectedPerfumes.length === 3 ? "grid-cols-3" :
                      "grid-cols-4"
                    }`}>
                      {selectedPerfumes.map(perfume => (
                        <div key={perfume.id}>
                          <h3 className="font-medium text-sm mb-3 truncate">{perfume.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            {perfume.accords.map(accord => (
                              <Badge key={accord} className="bg-primary/10 text-primary border-primary/20">
                                {accord}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Verdict */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <h2 className="font-serif text-xl font-semibold mb-2">Veredito rápido</h2>
                    <p className="text-muted-foreground mb-4">Com base em desempenho e popularidade</p>
                    <div className="inline-flex items-center gap-4 bg-card rounded-lg p-4">
                      {(() => {
                        const winner = [...selectedPerfumes].sort((a, b) => {
                          const scoreA = a.rating * 10 + a.longevity + a.sillage
                          const scoreB = b.rating * 10 + b.longevity + b.sillage
                          return scoreB - scoreA
                        })[0]
                        return (
                          <>
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                              <Image src={getPerfumeImage(winner)} alt={winner.name} fill className="object-cover" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm text-muted-foreground">{winner.brand}</p>
                              <p className="font-serif font-semibold">{winner.name}</p>
                              <p className="text-xs text-primary">Melhor resultado geral</p>
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-center gap-4 mt-8">
              <Button variant="outline" onClick={() => setSelectedPerfumes([])}>
                Limpar tudo
              </Button>
              <Link href="/perfumes">
                <Button variant="outline">Explorar mais</Button>
              </Link>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
