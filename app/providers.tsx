"use client"

import { PublicStatsProvider } from "@/components/public-stats-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return <PublicStatsProvider>{children}</PublicStatsProvider>
}
