import { Suspense } from "react"

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" aria-busy />}>{children}</Suspense>
  )
}
