import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, FlaskConical, ArrowLeftRight, Dna, Target, Compass, MessageSquare } from "lucide-react"
import Link from "next/link"
import { CatalogStatsStrip } from "@/components/catalog-stats-strip"

const tools = [
  {
    title: "Tradutor de perfume",
    description: "Descreva como você quer cheirar nas suas próprias palavras. A gente traduz isso em recomendações de fragrâncias.",
    icon: MessageSquare,
    href: "/discover/translate",
    color: "bg-emerald-100 text-emerald-700",
    badge: "Novo"
  },
  {
    title: "Quiz de perfil olfativo",
    description: "Responda algumas perguntas sobre suas preferências e rotina para descobrir seu perfil ideal.",
    icon: Sparkles,
    href: "/discover/quiz",
    color: "bg-amber-100 text-amber-700",
    badge: "Mais popular"
  },
  {
    title: "Montar por notas",
    description: "Selecione as notas que você ama (e as que você não gosta) para encontrar perfumes com a sua cara.",
    icon: FlaskConical,
    href: "/discover/build",
    color: "bg-rose-100 text-rose-700",
    badge: null
  },
  {
    title: "Comparar perfumes",
    description: "Compare até 4 fragrâncias lado a lado. Analise notas, performance, acordes e mais.",
    icon: ArrowLeftRight,
    href: "/compare",
    color: "bg-blue-100 text-blue-700",
    badge: null
  },
  {
    title: "Seu DNA olfativo",
    description: "Adicione perfumes que você tem ou ama e descubra seu perfil com notas e acordes característicos.",
    icon: Dna,
    href: "/discover/dna",
    color: "bg-purple-100 text-purple-700",
    badge: null
  },
  {
    title: "Encontrar similares",
    description: "Ama um perfume? Encontre alternativas parecidas, achados menos óbvios e opções mais acessíveis.",
    icon: Target,
    href: "/discover/similar",
    color: "bg-green-100 text-green-700",
    badge: null
  },
]

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Compass className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Descubra seu perfume ideal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ferramentas para explorar, comparar e encontrar fragrâncias que combinam com seu estilo.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full group cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${tool.color}`}>
                      <tool.icon className="h-7 w-7" />
                    </div>
                    {tool.badge && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Start CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="font-serif text-2xl font-semibold mb-3">Não sabe por onde começar?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Faça um quiz rápido para descobrir sua “personalidade olfativa” e receber recomendações personalizadas.
            </p>
            <Link href="/discover/quiz">
              <Button size="lg" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Começar o quiz
              </Button>
            </Link>
          </CardContent>
        </Card>

        <CatalogStatsStrip />
      </main>
      <Footer />
    </div>
  )
}
