"use client"

import Link from "next/link"
import { Search, User, Heart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/discover" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Descobrir
            </Link>
            <Link href="/perfumes" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Perfumes
            </Link>
            <Link href="/brands" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Marcas
            </Link>
            <Link href="/notes" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Notas
            </Link>
            <Link href="/community" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Comunidade
            </Link>
            <Link href="/compare" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Comparar
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Link href="/perfumes">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground hover:text-foreground">
              <Link href="/favoritos">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Lista de desejos</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground hover:text-foreground">
              <Link href="/perfil">
              <User className="h-5 w-5" />
              <span className="sr-only">Conta</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-muted-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="/discover" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Descobrir
              </Link>
              <Link href="/perfumes" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Perfumes
              </Link>
              <Link href="/brands" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Marcas
              </Link>
              <Link href="/notes" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Notas
              </Link>
              <Link href="/community" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Comunidade
              </Link>
              <Link href="/compare" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Comparar
              </Link>
              <Link href="/favoritos" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Favoritos
              </Link>
              <Link href="/perfil" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Perfil
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
