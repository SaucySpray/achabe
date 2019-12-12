const http = require('http')

const server = http.createServer((request, response) => {
    response.end('First server response !')
})

server.listen(process.env.PORT || 3000)

// ==================================== EXPRESS ==================================== //

// const express = require('express')
// const app = express()

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })

// app.get('/status', (req, res) => {
//     res.send('OK')
// })

// const port = 3000

// app.listen(port, () => {
//     console.log('My first express server with node.js')
// })