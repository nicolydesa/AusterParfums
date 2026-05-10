"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Search, Sparkles, Plus, FlaskConical } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { perfumes, notes } from "@/lib/data"
import { getPerfumeImage } from "@/lib/perfume-images"

const noteCategories = [
  { id: "floral", label: "Floral", color: "bg-pink-100 text-pink-800 border-pink-200" },
  { id: "amadeirado", label: "Amadeirado", color: "bg-amber-100 text-amber-800 border-amber-200" },
  { id: "citrico", label: "Cítrico", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { id: "oriental", label: "Oriental", color: "bg-orange-100 text-orange-800 border-orange-200" },
  { id: "fresco", label: "Fresco", color: "bg-cyan-100 text-cyan-800 border-cyan-200" },
  { id: "especiado", label: "Especiado", color: "bg-red-100 text-red-800 border-red-200" },
  { id: "frutado", label: "Frutado", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { id: "verde", label: "Verde", color: "bg-green-100 text-green-800 border-green-200" },
  { id: "aquatico", label: "Aquático", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { id: "gourmand", label: "Gourmand", color: "bg-rose-100 text-rose-800 border-rose-200" },
]

// Extended notes for the builder
// Notas estendidas para o construtor (Traduzidas)
const allNotes = [
  // Floral
  { name: "Rosa", category: "floral" },
  { name: "Jasmim", category: "floral" },
  { name: "Íris", category: "floral" },
  { name: "Tuberosa", category: "floral" },
  { name: "Flor de Laranjeira", category: "floral" },
  { name: "Violeta", category: "floral" },
  { name: "Lírio", category: "floral" },
  { name: "Peônia", category: "floral" },
  { name: "Magnólia", category: "floral" },
  { name: "Ylang-Ylang", category: "floral" },
  
  // Amadeirado
  { name: "Sândalo", category: "amadeirado" },
  { name: "Cedro", category: "amadeirado" },
  { name: "Oud", category: "amadeirado" },
  { name: "Vetiver", category: "amadeirado" },
  { name: "Patchouli", category: "amadeirado" },
  { name: "Bétula", category: "amadeirado" },
  { name: "Jacarandá", category: "amadeirado" },
  { name: "Madeira Guaiac", category: "amadeirado" },
  
  // Cítrico
  { name: "Bergamota", category: "citrico" },
  { name: "Limão", category: "citrico" },
  { name: "Toranja", category: "citrico" },
  { name: "Laranja", category: "citrico" },
  { name: "Lima", category: "citrico" },
  { name: "Mandarina", category: "citrico" },
  { name: "Yuzu", category: "citrico" },
  
  // Oriental
  { name: "Baunilha", category: "oriental" },
  { name: "Âmbar", category: "oriental" },
  { name: "Almíscar", category: "oriental" },
  { name: "Fava Tonka", category: "oriental" },
  { name: "Benzoíno", category: "oriental" },
  { name: "Incenso", category: "oriental" },
  { name: "Ládano", category: "oriental" },
  
  // Fresco
  { name: "Notas Marinhas", category: "fresco" },
  { name: "Hortelã", category: "fresco" },
  { name: "Lavanda", category: "fresco" },
  { name: "Eucalipto", category: "fresco" },
  { name: "Pepino", category: "fresco" },
  
  // Especiado
  { name: "Cardamomo", category: "especiado" },
  { name: "Pimenta", category: "especiado" },
  { name: "Canela", category: "especiado" },
  { name: "Açafrão", category: "especiado" },
  { name: "Gengibre", category: "especiado" },
  { name: "Noz-moscada", category: "especiado" },
  { name: "Cravo", category: "especiado" },
  { name: "Pimenta Rosa", category: "especiado" },
  
  // Frutado
  { name: "Maçã", category: "frutado" },
  { name: "Pera", category: "frutado" },
  { name: "Pêssego", category: "frutado" },
  { name: "Groselha Preta", category: "frutado" },
  { name: "Framboesa", category: "frutado" },
  { name: "Abacaxi", category: "frutado" },
  { name: "Coco", category: "frutado" },
  
  // Verde
  { name: "Manjericão", category: "verde" },
  { name: "Folha de Figo", category: "verde" },
  { name: "Gálbano", category: "verde" },
  { name: "Chá Verde", category: "verde" },
  { name: "Bambu", category: "verde" },
  
  // Aquático
  { name: "Notas Aquáticas", category: "aquatico" },
  { name: "Chuva", category: "aquatico" },
  { name: "Algas", category: "aquatico" },
  { name: "Notas Ozônicas", category: "aquatico" },
  
  // Gourmand
  { name: "Café", category: "gourmand" },
  { name: "Chocolate", category: "gourmand" },
  { name: "Caramelo", category: "gourmand" },
  { name: "Pralinê", category: "gourmand" },
  { name: "Mel", category: "gourmand" },
  { name: "Amêndoa", category: "gourmand" },
]
export default function BuildScentPage() {
  const [selectedNotes, setSelectedNotes] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [noteLiked, setNoteLiked] = useState<string[]>([])
  const [noteDisliked, setNoteDisliked] = useState<string[]>([])

  const filteredNotes = useMemo(() => {
    return allNotes.filter(note => {
      const matchesSearch = note.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === "all" || note.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory])

  const addNote = (noteName: string) => {
    if (!selectedNotes.includes(noteName) && selectedNotes.length < 8) {
      setSelectedNotes(prev => [...prev, noteName])
    }
  }

  const removeNote = (noteName: string) => {
    setSelectedNotes(prev => prev.filter(n => n !== noteName))
  }

  const toggleLike = (noteName: string) => {
    if (noteLiked.includes(noteName)) {
      setNoteLiked(prev => prev.filter(n => n !== noteName))
    } else {
      setNoteLiked(prev => [...prev, noteName])
      setNoteDisliked(prev => prev.filter(n => n !== noteName))
    }
  }

  const toggleDislike = (noteName: string) => {
    if (noteDisliked.includes(noteName)) {
      setNoteDisliked(prev => prev.filter(n => n !== noteName))
    } else {
      setNoteDisliked(prev => [...prev, noteName])
      setNoteLiked(prev => prev.filter(n => n !== noteName))
    }
  }

  // Find matching perfumes based on selected notes
  const matchingPerfumes = useMemo(() => {
    if (selectedNotes.length === 0) return []

    const scored = perfumes.map(perfume => {
      const allPerfumeNotes = [
        ...perfume.topNotes,
        ...perfume.middleNotes,
        ...perfume.baseNotes
      ].map(n => n.toLowerCase())

      let matchCount = 0
      let totalWeight = 0

      selectedNotes.forEach(note => {
        const noteLower = note.toLowerCase()
        if (allPerfumeNotes.some(pn => pn.includes(noteLower) || noteLower.includes(pn))) {
          matchCount++
        }
      })

      // Check for disliked notes (negative scoring)
      let penalty = 0
      noteDisliked.forEach(note => {
        const noteLower = note.toLowerCase()
        if (allPerfumeNotes.some(pn => pn.includes(noteLower))) {
          penalty += 20
        }
      })

      // Check for liked notes (bonus scoring)
      let bonus = 0
      noteLiked.forEach(note => {
        const noteLower = note.toLowerCase()
        if (allPerfumeNotes.some(pn => pn.includes(noteLower))) {
          bonus += 10
        }
      })

      const baseScore = (matchCount / selectedNotes.length) * 100
      const finalScore = Math.max(0, Math.min(100, baseScore + bonus - penalty))

      return { perfume, matchCount, score: Math.round(finalScore) }
    })

    return scored
      .filter(s => s.matchCount > 0)
      .sort((a, b) => b.score - a.score || b.matchCount - a.matchCount)
      .slice(0, 8)
  }, [selectedNotes, noteLiked, noteDisliked])

  const getCategoryColor = (category: string) => {
    return noteCategories.find(c => c.id === category)?.color || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FlaskConical className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            Monte sua fragrância ideal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecione as notas que você ama, marque as que não gosta e vamos encontrar perfumes com seu perfil.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Note Selection Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Notes */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-xl font-semibold">Sua seleção</h2>
                  <span className="text-sm text-muted-foreground">{selectedNotes.length}/8 notas</span>
                </div>
                {selectedNotes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Clique nas notas abaixo para adicionar à sua seleção</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedNotes.map(note => {
                      const noteData = allNotes.find(n => n.name === note)
                      return (
                        <Badge
                          key={note}
                          variant="outline"
                          className={`${getCategoryColor(noteData?.category || "")} px-3 py-1.5 text-sm gap-2`}
                        >
                          {note}
                          <button onClick={() => removeNote(note)} className="hover:opacity-70">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                )}

                {/* Like/Dislike Section */}
                {(noteLiked.length > 0 || noteDisliked.length > 0) && (
                  <div className="mt-6 pt-6 border-t border-border grid sm:grid-cols-2 gap-4">
                    {noteLiked.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-green-700 mb-2">Essenciais</p>
                        <div className="flex flex-wrap gap-1">
                          {noteLiked.map(note => (
                            <Badge key={note} className="bg-green-100 text-green-800 text-xs">
                              {note}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {noteDisliked.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-red-700 mb-2">Evitar</p>
                        <div className="flex flex-wrap gap-1">
                          {noteDisliked.map(note => (
                            <Badge key={note} className="bg-red-100 text-red-800 text-xs">
                              {note}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Note Browser */}
            <Card>
              <CardContent className="p-6">
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar notas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Category Tabs */}
                <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="flex flex-wrap h-auto gap-1 mb-6 bg-transparent">
                    <TabsTrigger value="all" className="text-xs">Todas</TabsTrigger>
                    {noteCategories.map(cat => (
                      <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                        {cat.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value={activeCategory} className="mt-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {filteredNotes.map(note => {
                        const isSelected = selectedNotes.includes(note.name)
                        const isLiked = noteLiked.includes(note.name)
                        const isDisliked = noteDisliked.includes(note.name)
                        
                        return (
                          <div
                            key={note.name}
                            className={`group relative p-3 rounded-lg border transition-all cursor-pointer ${
                              isSelected 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <button
                              onClick={() => isSelected ? removeNote(note.name) : addNote(note.name)}
                              className="w-full text-left"
                            >
                              <p className="font-medium text-sm text-foreground">{note.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{note.category}</p>
                            </button>
                            
                            {/* Like/Dislike buttons */}
                            <div className="absolute right-1 top-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleLike(note.name) }}
                                className={`p-1 rounded ${isLiked ? "text-green-600 bg-green-50" : "text-muted-foreground hover:text-green-600"}`}
                              >
                                <svg className="h-3 w-3" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleDislike(note.name) }}
                                className={`p-1 rounded ${isDisliked ? "text-red-600 bg-red-50" : "text-muted-foreground hover:text-red-600"}`}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="font-serif text-xl font-semibold">Perfumes compatíveis</h2>
                </div>

                {selectedNotes.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="text-sm">Selecione notas para ver perfumes compatíveis</p>
                  </div>
                ) : matchingPerfumes.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="text-sm">Nenhum resultado exato encontrado. Tente outras notas.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {matchingPerfumes.map(({ perfume, score, matchCount }) => (
                      <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={getPerfumeImage(perfume)}
                              alt={perfume.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground truncate">{perfume.brand}</p>
                            <p className="font-medium text-sm text-foreground truncate">{perfume.name}</p>
                            <p className="text-xs text-muted-foreground">{matchCount} notas em comum</p>
                          </div>
                          <div className="flex-shrink-0">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              score >= 70 ? "bg-green-100 text-green-800" :
                              score >= 40 ? "bg-yellow-100 text-yellow-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {score}%
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {selectedNotes.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button variant="outline" className="w-full" onClick={() => setSelectedNotes([])}>
                      Limpar seleção
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
