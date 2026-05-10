import type { Perfume } from "@/lib/data"
import { perfumes } from "@/lib/data"

function svgDataUri(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const fimgsIdRegex = /mdimg\/perfume\/375x500\.(\d+)\.jpg/

const fimgsCounts = (() => {
  const counts = new Map<string, number>()
  for (const p of perfumes) {
    const m = p.image.match(fimgsIdRegex)
    if (!m) continue
    counts.set(m[1], (counts.get(m[1]) ?? 0) + 1)
  }
  return counts
})()

export function getPerfumeImage(perfume: Perfume) {
  const m = perfume.image.match(fimgsIdRegex)
  const isSharedFimgs = m ? (fimgsCounts.get(m[1]) ?? 0) > 1 : false

  if (!m || !isSharedFimgs) return perfume.image

  // Many entries in the mock dataset reuse the same fimgs image id.
  // Showing a neutral placeholder is safer than showing the wrong bottle.
  const title = `${perfume.brand} — ${perfume.name}`
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1f2937"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" rx="48" fill="url(#g)"/>
  <rect x="56" y="56" width="688" height="688" rx="40" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)"/>
  <text x="100" y="350" fill="rgba(255,255,255,0.92)" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="44" font-weight="700">
    ${escapeXml(perfume.name)}
  </text>
  <text x="100" y="410" fill="rgba(255,255,255,0.80)" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="28" font-weight="500">
    ${escapeXml(perfume.brand)}
  </text>
  <text x="100" y="690" fill="rgba(255,255,255,0.55)" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="18">
    Imagem indisponível no dataset
  </text>
</svg>`
  return svgDataUri(svg)
}

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

