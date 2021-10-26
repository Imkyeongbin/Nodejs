// @ts-check

const express = require('express')

const app = express()

const PORT = 5000

app.get('/ab?cd', (req, res) =>{
    res.send('/ab?cd - GET')
})

app.get('/ab+cd', (req, res) =>{
    res.send('/ab+cd - GET')
})

app.get('/ab*cd', (req, res) =>{
    res.send('/ab*cd - GET')
})

app.get('/a(bc)?d', (req, res) =>{
    res.send('/a(bc)?d - GET')
})

app.get(/abcd/, (req, res) =>{
    res.send('/abcd/ - GET')
})

app.get(/^\/abced$/, (req, res) =>{
    res.send('/^\/abced$/ - GET')
})

app.get(['/abc', /xyz/], (req, res) =>{
    res.send(`['/abc', /xyz/] - GET`)
})


app.post('/', (req, res) =>{
    res.send('Root - POST')
})

app.listen(PORT, () =>{
    console.log(`The Express server is listening at port : ${PORT}`)
})