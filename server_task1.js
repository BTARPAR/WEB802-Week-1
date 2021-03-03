const http = require('http')

const HOSTNAME = 'localhost'
const PORT = 5000

const server = http.createServer((req, res) => {

  console.log(`Request for ${req.url} by method ${req.method}`)

  if (req.method === 'GET') {
    const data = req.url === '/' ? 'home' : req.url.slice(1)
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(`<html><body><h1 style="text-transform: capitalize">${data} page</h1></body></html>`)
  }

})

server.listen(PORT, HOSTNAME, () => {
  console.log(`The NodeJS server on port ${PORT} is now running`)
  console.log(`Server running at http://${HOSTNAME}:${PORT}`)
})
