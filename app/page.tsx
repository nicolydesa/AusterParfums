import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedSection } from "@/components/featured-section"
import { NotesExplorer } from "@/components/notes-explorer"
import { BrandsSection } from "@/components/brands-section"
import { CommunitySection } from "@/components/community-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedSection />
        <NotesExplorer />
        <BrandsSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  )
}
