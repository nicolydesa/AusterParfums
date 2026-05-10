import Link from "next/link"
import { Logo } from "@/components/logo"

const footerLinks = {
  discover: [
    { label: "Encontrar perfumes", href: "/perfumes" },
    { label: "Lançamentos", href: "/perfumes?sort=newest" },
    { label: "Mais bem avaliados", href: "/perfumes?sort=top-rated" },
    { label: "Prêmios 2026", href: "/perfumes?sort=top-rated" },
  ],
  explore: [
    { label: "Todas as marcas", href: "/brands" },
    { label: "Perfumistas", href: "/brands" },
    { label: "Diretório de notas", href: "/notes" },
    { label: "Acordes", href: "/notes" },
  ],
  community: [
    { label: "Fórum", href: "/community" },
    { label: "Avaliações", href: "/community" },
    { label: "Coleções", href: "/community" },
    { label: "Artigos", href: "/community" },
  ],
  about: [
    { label: "Sobre", href: "/about" },
    { label: "Contato", href: "/contact" },
    { label: "Privacidade", href: "/privacy" },
    { label: "Termos", href: "/terms" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" />
            <p className="mt-4 text-sm text-muted-foreground">
              Sua plataforma para descobrir fragrâncias. Explore, compare e encontre seu perfume assinatura.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Descobrir</h4>
            <ul className="space-y-3">
              {footerLinks.discover.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Explorar</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Comunidade</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Sobre</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Verdara. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="https://instagram.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Instagram
            </Link>
            <Link href="https://x.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </Link>
            <Link href="https://youtube.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              YouTube
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
