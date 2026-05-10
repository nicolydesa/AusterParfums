import { Suspense } from "react"

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col bg-background">
          <div className="flex-1 animate-pulse bg-muted/30" aria-hidden />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}
