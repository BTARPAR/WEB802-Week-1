const http = require('http')
const fs = require('fs')
const path = require('path')

const HOSTNAME = 'localhost'
const PORT = 5001

const server = http.createServer((req, res) => {

  console.log(`Request for ${req.url} by method ${req.method}`)

  if (req.method === 'GET') {
    let fileUrl = req.url
    if (fileUrl === '/') {
      fileUrl = '/home.html'
    }
    const filePath = path.resolve('./public' + fileUrl)
    const fileExt = path.extname(filePath)

    if (fileExt === '.html') {
      fs.access(filePath, err => {
        if (err) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html')
          res.end(`<html><body><h1>Invalid Request!</h1></body></html>`)
          return
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream(filePath).pipe(res)
      })
    } else {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html')
      res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`)
    }
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html')
    res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`)
  }

})

server.listen(PORT, HOSTNAME, () => {
  console.log(`The NodeJS server on port ${PORT} is now running`)
  console.log(`Server running at http://${HOSTNAME}:${PORT}`)
})
