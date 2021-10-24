// @ts-check
const http = require('http')

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.end('hello!')
})

const PORT = 4000
server.listen(PORT, () => {
    console.log(`서버 실행중 포트 : ${PORT}`)
})