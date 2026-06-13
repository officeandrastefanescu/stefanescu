const fs = require('fs')
const path = require('path')
const ROOT = __dirname
const from = /Andra Hartlieb/g
const to = 'Andra Hartlieb'

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['.git','node_modules','functions-internal','v1'].includes(e.name)) continue
      walk(full)
    } else {
      const skipExt = ['.png','.jpg','.jpeg','.webp','.gif','.ico','.mp4','.pdf','.zip','.gz']
      if (skipExt.includes(path.extname(e.name).toLowerCase())) continue
      try {
        let txt = fs.readFileSync(full, 'utf8')
        if (from.test(txt)) {
          const replaced = txt.replace(from, to)
          fs.writeFileSync(full, replaced, 'utf8')
          console.log('Updated:', full)
        }
      } catch (err) {
        // ignore
      }
    }
  }
}

walk(ROOT)
console.log('Done')
