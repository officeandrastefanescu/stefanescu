const http = require('http')
const fs   = require('fs')
const path = require('path')
const url  = require('url')

const PORT = 3000
const DIR  = __dirname
const PASS = 'andra2025'

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css' : 'text/css',
  '.js'  : 'application/javascript',
  '.jpg' : 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png' : 'image/png',
  '.gif' : 'image/gif',
  '.svg' : 'image/svg+xml',
  '.ico' : 'image/x-icon',
  '.pdf' : 'application/pdf',
}

http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)

  // ── SAVE endpoint ──
  if (req.method === 'POST' && pathname === '/save') {
    let body = ''
    req.on('data', c => body += c)
    req.on('end', () => {
      try {
        const { html, password } = JSON.parse(body)
        if (password !== PASS) {
          res.writeHead(403); res.end('Wrong password'); return
        }
        fs.writeFileSync(path.join(DIR, 'index.html'), html, 'utf8')
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
        res.end(JSON.stringify({ ok: true }))
      } catch (e) {
        res.writeHead(500); res.end(e.message)
      }
    })
    return
  }

  // ── Static files ──
  const filePath = path.join(DIR, pathname === '/' ? 'index.html' : pathname)
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return }
    const ext = path.extname(filePath).toLowerCase()
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' })
    res.end(data)
  })

}).listen(PORT, () => {
  console.log('')
  console.log('  ✏️  Page editor ready → http://localhost:' + PORT)
  console.log('  Password: ' + PASS)
  console.log('')
})
