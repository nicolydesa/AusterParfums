import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Compass } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <Compass className="h-8 w-8 text-primary" aria-hidden />
        </div>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Erro 404</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-foreground text-balance">
          Página não encontrada
        </h1>
        <p className="mt-4 text-muted-foreground max-w-md text-pretty">
          O endereço pode estar incorreto ou o conteúdo foi movido. Que tal voltar ao início ou explorar o catálogo?
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">Ir para a página inicial</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/perfumes">Ver perfumes</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
