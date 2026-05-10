export function formatRelativeTimePt(d: Date): string {
  const sec = Math.floor((Date.now() - d.getTime()) / 1000)
  if (sec < 10) return "agora"
  if (sec < 60) return `há ${sec}s`
  const min = Math.floor(sec / 60)
  if (min < 60) return `há ${min} min`
  const h = Math.floor(min / 60)
  if (h < 48) return `há ${h} h`
  const days = Math.floor(h / 24)
  if (days < 14) return `há ${days} d`
  return d.toLocaleDateString("pt-BR")
}
