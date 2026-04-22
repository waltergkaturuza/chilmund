/**
 * Recompress team JPGs in /public (max long edge 1200px, ~85% JPEG).
 * Run: node scripts/optimize-team-portraits.mjs
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const publicDir = path.resolve(process.cwd(), 'public')
const skip = new Set(['.gitkeep'])

async function main() {
  const files = fs.readdirSync(publicDir).filter((f) => f.endsWith('.jpg') && !skip.has(f))
  if (files.length === 0) {
    console.log('No JPG files in public/')
    return
  }

  for (const name of files) {
    const input = path.join(publicDir, name)
    const tmp = path.join(publicDir, `.opt-${name}`)
    const before = fs.statSync(input).size

    await sharp(input)
      .rotate()
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 86, mozjpeg: true, progressive: true })
      .toFile(tmp)

    fs.renameSync(tmp, input)
    const after = fs.statSync(input).size
    console.log(`${name}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
