const fs = require("fs")
const path = require("path")

const dataPath = path.join(process.cwd(), "lib", "data.ts")
const s = fs.readFileSync(dataPath, "utf8")

// Best-effort extraction for this mock dataset: each perfume entry has id/name/image.
const re =
  /\{\s*id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"[\s\S]*?\}/g

/** @type {{id:string,name:string,image:string}[]} */
const rows = []
let m
while ((m = re.exec(s))) {
  rows.push({ id: m[1], name: m[2], image: m[3] })
}

function fimgsId(url) {
  const mm = url.match(/mdimg\/perfume\/375x500\.(\d+)\.jpg/)
  return mm ? mm[1] : null
}

/** @type {Map<string, {id:string,name:string,image:string}[]>} */
const map = new Map()
for (const r of rows) {
  const id = fimgsId(r.image)
  if (!id) continue
  if (!map.has(id)) map.set(id, [])
  map.get(id).push(r)
}

const duplicates = [...map.entries()]
  .filter(([, v]) => v.length > 1)
  .sort((a, b) => b[1].length - a[1].length)
  .map(([id, items]) => ({ id, count: items.length, items }))

const out = {
  totalPerfumesDetected: rows.length,
  fimgsImagesDetected: map.size,
  duplicateFimgsImageIds: duplicates.length,
  duplicates,
}

process.stdout.write(JSON.stringify(out, null, 2))

