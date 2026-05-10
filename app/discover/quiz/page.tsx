"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Sparkles, Sun, Moon, TreePine, Waves, Flame, Flower2, Coffee, Wind } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { perfumes } from "@/lib/data"
import { getPerfumeImage } from "@/lib/perfume-images"

interface QuizQuestion {
  id: number
  question: string
  subtitle: string
  type: "single" | "multiple" | "slider" | "image"
  options: {
    value: string
    label: string
    description?: string
    icon?: React.ReactNode
    image?: string
    traits: string[]
  }[]
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Quando você costuma usar fragrância?",
    subtitle: "Selecione todas as opções que se aplicam",
    type: "multiple",
    options: [
      { value: "daily", label: "Uso diário", description: "Trabalho, saídas casuais", icon: <Sun className="h-6 w-6" />, traits: ["versatile", "fresh", "subtle"] },
      { value: "evening", label: "Eventos noturnos", description: "Jantares, festas", icon: <Moon className="h-6 w-6" />, traits: ["intense", "seductive", "warm"] },
      { value: "special", label: "Ocasiões especiais", description: "Encontros, celebrações", icon: <Sparkles className="h-6 w-6" />, traits: ["unique", "memorable", "luxurious"] },
      { value: "outdoor", label: "Atividades ao ar livre", description: "Esporte, natureza", icon: <TreePine className="h-6 w-6" />, traits: ["fresh", "aquatic", "energizing"] },
    ]
  },
  {
    id: 2,
    question: "Qual ambiente mais combina com você?",
    subtitle: "Escolha a cena que mais te representa",
    type: "image",
    options: [
      { value: "forest", label: "Floresta com neblina", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop", traits: ["woody", "green", "earthy"] },
      { value: "beach", label: "Brisa do oceano", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop", traits: ["aquatic", "fresh", "clean"] },
      { value: "garden", label: "Jardim florido", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop", traits: ["floral", "sweet", "romantic"] },
      { value: "desert", label: "Pôr do sol no deserto", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop", traits: ["spicy", "warm", "exotic"] },
    ]
  },
  {
    id: 3,
    question: "Quais famílias olfativas te atraem?",
    subtitle: "Selecione até 3 favoritas",
    type: "multiple",
    options: [
      { value: "floral", label: "Floral", description: "Rosa, jasmim, lírio", icon: <Flower2 className="h-6 w-6" />, traits: ["romantic", "feminine", "elegant"] },
      { value: "woody", label: "Amadeirado", description: "Sândalo, cedro, oud", icon: <TreePine className="h-6 w-6" />, traits: ["sophisticated", "grounding", "warm"] },
      { value: "fresh", label: "Fresco", description: "Cítrico, verde, aquático", icon: <Wind className="h-6 w-6" />, traits: ["clean", "energizing", "light"] },
      { value: "oriental", label: "Oriental", description: "Baunilha, âmbar, especiarias", icon: <Flame className="h-6 w-6" />, traits: ["sensual", "mysterious", "warm"] },
      { value: "gourmand", label: "Gourmand", description: "Café, chocolate, caramelo", icon: <Coffee className="h-6 w-6" />, traits: ["sweet", "cozy", "indulgent"] },
      { value: "aquatic", label: "Aquático", description: "Oceano, chuva, ar fresco", icon: <Waves className="h-6 w-6" />, traits: ["refreshing", "clean", "casual"] },
    ]
  },
  {
    id: 4,
    question: "Quanto tempo sua fragrância deve durar?",
    subtitle: "Escolha a fixação preferida",
    type: "single",
    options: [
      { value: "light", label: "2-4 horas", description: "Leve e sutil", traits: ["subtle", "fresh", "casual"] },
      { value: "moderate", label: "4-6 horas", description: "Presença moderada", traits: ["balanced", "versatile", "office-friendly"] },
      { value: "long", label: "6-8 horas", description: "Longa duração", traits: ["intense", "powerful", "memorable"] },
      { value: "beast", label: "8+ horas", description: "Super potente", traits: ["strong", "projecting", "statement"] },
    ]
  },
  {
    id: 5,
    question: "Que impressão você quer causar?",
    subtitle: "Escolha a vibe que combina com você",
    type: "single",
    options: [
      { value: "confident", label: "Confiante e marcante", description: "Chame atenção quando entrar no ambiente", traits: ["powerful", "intense", "striking"] },
      { value: "mysterious", label: "Misterioso e intrigante", description: "Deixe as pessoas querendo saber mais", traits: ["unique", "complex", "seductive"] },
      { value: "approachable", label: "Aconchegante e acessível", description: "Convide as pessoas com sua presença", traits: ["cozy", "friendly", "inviting"] },
      { value: "elegant", label: "Refinado e elegante", description: "Transmita sofisticação e classe", traits: ["classy", "polished", "timeless"] },
      { value: "fresh", label: "Limpo e fresco", description: "Irradie frescor e energia positiva", traits: ["clean", "uplifting", "energetic"] },
    ]
  },
  {
    id: 6,
    question: "Qual é sua estação favorita?",
    subtitle: "Isso ajuda a ajustar intensidade e perfil",
    type: "single",
    options: [
      { value: "spring", label: "Primavera", description: "Flores frescas, novos começos", traits: ["floral", "green", "light"] },
      { value: "summer", label: "Verão", description: "Sol quente, brisa do mar", traits: ["aquatic", "citrus", "fresh"] },
      { value: "fall", label: "Outono", description: "Roupas confortáveis, folhas caindo", traits: ["spicy", "woody", "warm"] },
      { value: "winter", label: "Inverno", description: "Calor da lareira, noites frias", traits: ["oriental", "gourmand", "rich"] },
    ]
  },
]

interface QuizResult {
  profile: {
    name: string
    description: string
    primaryNotes: string[]
    secondaryNotes: string[]
    characteristics: string[]
  }
  recommendations: typeof perfumes
  matches: { perfume: typeof perfumes[0], matchScore: number }[]
}

function calculateResults(answers: Record<number, string[]>): QuizResult {
  // Collect all traits from answers
  const allTraits: string[] = []
  
  Object.entries(answers).forEach(([questionId, selectedValues]) => {
    const question = quizQuestions.find(q => q.id === parseInt(questionId))
    if (question) {
      selectedValues.forEach(value => {
        const option = question.options.find(o => o.value === value)
        if (option) {
          allTraits.push(...option.traits)
        }
      })
    }
  })

  // Count trait frequencies
  const traitCounts: Record<string, number> = {}
  allTraits.forEach(trait => {
    traitCounts[trait] = (traitCounts[trait] || 0) + 1
  })

  // Determine profile based on dominant traits
  const sortedTraits = Object.entries(traitCounts).sort((a, b) => b[1] - a[1])
  const dominantTraits = sortedTraits.slice(0, 5).map(([trait]) => trait)

  // Define profiles
  const profiles: Record<string, QuizResult["profile"]> = {
    sophisticated: {
      name: "O Sofisticado",
      description: "Você prefere fragrâncias refinadas e elegantes, que deixam impressão sutil, porém duradoura.",
      primaryNotes: ["Íris", "Sândalo", "Âmbar"],
      secondaryNotes: ["Rosa", "Vetiver", "Almíscar"],
      characteristics: ["Elegante", "Clássico", "Refinado"]
    },
    adventurer: {
      name: "O Aventureiro",
      description: "Você gosta de perfumes frescos e energizantes, com sensação de natureza e liberdade.",
      primaryNotes: ["Bergamota", "Notas marinhas", "Cedro"],
      secondaryNotes: ["Toranja", "Hortelã", "Vetiver"],
      characteristics: ["Energético", "Fresco", "Dinâmico"]
    },
    romantic: {
      name: "O Romântico",
      description: "Notas florais e adocicadas te conquistam. Você gosta de fragrâncias acolhedoras e encantadoras.",
      primaryNotes: ["Rosa", "Jasmim", "Baunilha"],
      secondaryNotes: ["Peônia", "Almíscar", "Fava Tonka"],
      characteristics: ["Romântico", "Quente", "Encantador"]
    },
    mystic: {
      name: "O Místico",
      description: "Você se conecta com fragrâncias complexas e misteriosas. Oud, incenso e especiarias exóticas definem seu estilo.",
      primaryNotes: ["Oud", "Açafrão", "Incenso"],
      secondaryNotes: ["Âmbar", "Patchouli", "Couro"],
      characteristics: ["Misterioso", "Complexo", "Intrigante"]
    },
    minimalist: {
      name: "O Minimalista",
      description: "Perfumes limpos e discretos são sua assinatura. Você prefere fragrâncias que complementam sem exagerar.",
      primaryNotes: ["Almíscar", "Cedro", "Íris"],
      secondaryNotes: ["Chá Branco", "Algodão", "Acorde de Pele"],
      characteristics: ["Limpo", "Sutil", "Moderno"]
    }
  }

  // Determine which profile matches best
  let profileKey = "sophisticated"
  if (dominantTraits.includes("fresh") && dominantTraits.includes("aquatic")) {
    profileKey = "adventurer"
  } else if (dominantTraits.includes("romantic") || dominantTraits.includes("floral")) {
    profileKey = "romantic"
  } else if (dominantTraits.includes("mysterious") || dominantTraits.includes("exotic")) {
    profileKey = "mystic"
  } else if (dominantTraits.includes("clean") && dominantTraits.includes("subtle")) {
    profileKey = "minimalist"
  }

  const profile = profiles[profileKey]

  // Score perfumes based on trait matching
  const scoredPerfumes = perfumes.map(perfume => {
    let score = 0
    const allPerfumeNotes = [...perfume.topNotes, ...perfume.middleNotes, ...perfume.baseNotes].map(n => n.toLowerCase())
    const perfumeAccords = perfume.accords.map(a => a.toLowerCase())

    // Check note matches
    profile.primaryNotes.forEach(note => {
      if (allPerfumeNotes.some(n => n.includes(note.toLowerCase()))) score += 15
    })
    profile.secondaryNotes.forEach(note => {
      if (allPerfumeNotes.some(n => n.includes(note.toLowerCase()))) score += 10
    })

    // Check accord matches based on traits
    if (dominantTraits.includes("woody") && perfumeAccords.some(a => a.includes("woody"))) score += 10
    if (dominantTraits.includes("fresh") && perfumeAccords.some(a => a.includes("fresh"))) score += 10
    if (dominantTraits.includes("warm") && perfumeAccords.some(a => a.includes("warm"))) score += 10
    if (dominantTraits.includes("sweet") && perfumeAccords.some(a => a.includes("sweet"))) score += 10

    // Bonus for high-rated perfumes
    score += perfume.rating * 2

    return { perfume, matchScore: Math.min(score, 100) }
  })

  // Sort by score and take top matches
  const matches = scoredPerfumes.sort((a, b) => b.matchScore - a.matchScore).slice(0, 6)

  return {
    profile,
    recommendations: matches.map(m => m.perfume),
    matches
  }
}

export default function ScentFinderQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string[]>>({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<QuizResult | null>(null)

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const currentAnswers = answers[question.id] || []

  const handleOptionSelect = (value: string) => {
    if (question.type === "single" || question.type === "image") {
      setAnswers(prev => ({ ...prev, [question.id]: [value] }))
    } else {
      // Multiple selection
      setAnswers(prev => {
        const current = prev[question.id] || []
        if (current.includes(value)) {
          return { ...prev, [question.id]: current.filter(v => v !== value) }
        } else {
          // Limit to 3 for "select up to 3" questions
          if (current.length >= 3 && question.id === 3) return prev
          return { ...prev, [question.id]: [...current, value] }
        }
      })
    }
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Calculate results
      const calculatedResults = calculateResults(answers)
      setResults(calculatedResults)
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const canProceed = currentAnswers.length > 0

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Profile Result */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
              {results.profile.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {results.profile.description}
            </p>
          </div>

          {/* Fragrance DNA */}
          <Card className="mb-12">
            <CardContent className="p-8">
            <h2 className="font-serif text-2xl font-semibold mb-6 text-center">Seu DNA olfativo</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Notas principais</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.profile.primaryNotes.map(note => (
                      <span key={note} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Notas secundárias</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.profile.secondaryNotes.map(note => (
                      <span key={note} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Seu estilo</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.profile.characteristics.map(char => (
                      <span key={char} className="px-3 py-1.5 bg-accent/50 text-accent-foreground rounded-full text-sm">
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div>
            <h2 className="font-serif text-2xl font-semibold mb-6 text-center">Seus melhores resultados</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.matches.map(({ perfume, matchScore }) => (
                <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
                  <Card className="group cursor-pointer hover:shadow-lg transition-all">
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden rounded-t-lg">
                        <Image
                          src={getPerfumeImage(perfume)}
                          alt={perfume.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                          {matchScore}% compatível
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground">{perfume.brand}</p>
                        <h3 className="font-serif font-semibold text-foreground">{perfume.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-sm text-primary font-medium">{perfume.rating}</span>
                          <span className="text-xs text-muted-foreground">({perfume.reviewCount.toLocaleString()} avaliações)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button variant="outline" onClick={() => { setShowResults(false); setCurrentQuestion(0); setAnswers({}) }}>
              Refazer quiz
            </Button>
            <Link href="/discover/dna">
              <Button>Ver perfil de DNA completo</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Pergunta {currentQuestion + 1} de {quizQuestions.length}</span>
            <span>{Math.round(progress)}% concluído</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            {question.question}
          </h1>
          <p className="text-muted-foreground">{question.subtitle}</p>
        </div>

        {/* Options */}
        <div className={`grid gap-4 mb-8 ${question.type === "image" ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
          {question.options.map((option) => {
            const isSelected = currentAnswers.includes(option.value)
            
            if (question.type === "image") {
              return (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                    isSelected ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={option.image!}
                    alt={option.label}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-serif font-semibold text-lg">{option.label}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              )
            }

            return (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                  isSelected 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                {option.icon && (
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {option.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{option.label}</p>
                  {option.description && (
                    <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
                  )}
                </div>
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="gap-2"
          >
            {currentQuestion === quizQuestions.length - 1 ? "Ver resultados" : "Próxima"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
