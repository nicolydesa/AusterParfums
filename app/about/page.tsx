import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Heart, Users, Search, Sparkles } from "lucide-react"
import Link from "next/link"
import { AboutStatsStrip } from "@/components/about-stats-strip"

const values = [
  {
    icon: Search,
    title: "Descoberta",
    description: "Acreditamos que toda pessoa merece encontrar sua fragrância ideal. Nossas ferramentas tornam essa busca simples e prazerosa."
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "A fragrância é pessoal, mas a jornada pode ser coletiva. Nossa comunidade se ajuda a descobrir novos favoritos."
  },
  {
    icon: Heart,
    title: "Paixão",
    description: "Também somos apaixonados por perfumaria. Cada recurso nasce de um interesse real pela arte das fragrâncias."
  },
  {
    icon: Sparkles,
    title: "Inovação",
    description: "De recomendações inteligentes ao perfil olfativo, usamos tecnologia para melhorar sua experiência de descoberta."
  },
]

const team = [
  {
    name: "Maria Bernardes",
    role: "Fundadora e CEO",
    image: "./assets/images/maria.jpg",
    bio: "Fundadora e CEO da Verdara."
  },
  {
    name: "Felipe Pertile",
    role: "Líder de Produto",
    image: "./assets/images/pertile.jpg",
    bio: "Marketing e Comunicação." 
  },
  {
    name: "Nicoly Quechini",
    role: "Designer",
    image: "./assets/images/nicoly.jpg",
    bio: "Organizadora da Interface."
  },
  {
    name: "Matheus Polinski",
    role: "Desenvolvedor Principal",
    image: "./assets/images/matheus.jpg",
    bio: "Frontend Developer."
  },
  {
    name: "Samuel Vortmann",
    role: "Desenvolvedor Principal",
    image: "./assets/images/samuel.jpg",
    bio: "Frontend e Backend Developer."
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground text-balance">
                Ajudando você a encontrar seu perfume assinatura
              </h1>
              <p className="mt-6 text-lg text-muted-foreground text-pretty">
                A Verdara é uma plataforma completa para descoberta de fragrâncias. Combinamos conhecimento especializado, experiências da comunidade e tecnologia para ajudar você a explorar o universo da perfumaria.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AboutStatsStrip />
          </div>
        </section>

        {/* Nossa história */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                  Nossa história
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    A Verdara nasceu de uma frustração simples: encontrar a fragrância ideal não deveria ser tão difícil. Como entusiastas, passamos horas pesquisando, testando e comparando perfumes em várias fontes.
                  </p>
                  <p>
                    Fundamos a Verdara em 2026 com a missão de criar uma plataforma de descoberta realmente útil. Um lugar em que qualquer pessoa, de iniciante a colecionador experiente, pudesse explorar, aprender e encontrar o perfume certo.
                  </p>
                  <p>
                    Hoje, temos orgulho de atender uma comunidade global de apaixonados por fragrâncias. Nossa plataforma combina uma base robusta de perfumes com ferramentas de descoberta para ajudar pessoas a encontrar aromas com os quais se identificam.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop"
                    alt="Coleção de frascos de perfume de luxo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border">
                  <p className="font-serif text-2xl font-semibold text-primary">Desde 2026</p>
                  <p className="text-sm text-muted-foreground">Ajudando você a descobrir fragrâncias</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                O que nos move
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Nossos valores orientam tudo o que fazemos: dos recursos que criamos à forma como nos relacionamos com a comunidade.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="bg-card rounded-xl p-6 border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Time */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                Conheça nosso time
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Um grupo apaixonado por fragrâncias, tecnologia e comunidade.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-foreground">
              Pronto para encontrar seu perfume assinatura?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Junte-se à comunidade Verdara e comece hoje sua jornada de descoberta.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/discover/quiz">Fazer o quiz</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/perfumes">Explorar perfumes</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}