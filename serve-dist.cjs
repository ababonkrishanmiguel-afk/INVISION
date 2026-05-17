const http = require('http')
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, 'dist')
const port = 5173

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon'
}

http
  .createServer((req, res) => {
    const cleanUrl = decodeURIComponent((req.url || '/').split('?')[0])
    const target = cleanUrl === '/' ? '/index.html' : cleanUrl
    const filePath = path.join(root, target)

    const safePath = path.normalize(filePath)
    if (!safePath.startsWith(root)) {
      res.writeHead(403)
      res.end('Forbidden')
      return
    }

    fs.readFile(safePath, (err, data) => {
      if (err) {
        fs.readFile(path.join(root, 'index.html'), (fallbackErr, fallbackData) => {
          if (fallbackErr) {
            res.writeHead(404)
            res.end('Not Found')
            return
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
          res.end(fallbackData)
        })
        return
      }

      const ext = path.extname(safePath).toLowerCase()
      res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' })
      res.end(data)
    })
  })
  .listen(port, '127.0.0.1', () => {
    console.log(`Static server running at http://127.0.0.1:${port}`)
  })
