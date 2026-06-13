const fs = require('fs')
const path = require('path')

const ROOT = __dirname
const from = /(?:https?:\/\/)?(?:www\.)?andrastefanescu\.com/gi
const dryRun = false

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['.git','node_modules','.netlify','functions-internal','v1'].includes(e.name)) continue
      walk(full)
    } else {
      // skip binary-ish files by extension
      const skipExt = ['.png','.jpg','.jpeg','.webp','.gif','.ico','.mp4','.pdf','.zip','.gz']
      if (skipExt.includes(path.extname(e.name).toLowerCase())) continue
      try {
        let txt = fs.readFileSync(full, 'utf8')
        if (from.test(txt)) {
          const replaced = txt.replace(from, (m)=>{
            // preserve protocol if present
            if (/^https?:\/\//i.test(m)) {
              return m.replace(/andrastefanescu\.com/i, 'andrahartlieb.com')
            }
            if (/^www\./i.test(m)) return 'www.andrahartlieb.com'
            return 'andrahartlieb.com'
          })
          console.log('Updated:', full)
          if (!dryRun) fs.writeFileSync(full, replaced, 'utf8')
        }
      } catch (err) {
        // ignore binary or read errors
      }
    }
  }
}

walk(ROOT)
console.log('Done')
