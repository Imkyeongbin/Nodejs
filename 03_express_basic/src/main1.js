// @ts-check

const express = require('express')
const fs = require('fs')


const app = express()

const PORT = 5000


app.use('/', (req, res, next) => {
    console.log('Middleware 1')
    
    // setTimeout(() =>{     
    //     next()
    // }, 1000)

    const requestedAt = new Date()
    // @ts-ignore
    req.requestedAt = requestedAt
    next()
},
(req, res, next) => {
    console.log('Middleware 1-2')
    next()
},
async (req, res, next) => {
    const fileContent = await fs.promises.readFile('.gitignore')
    // @ts-ignore
    req.fileContent = fileContent
    next()
})

app.use((req, res) => {
    console.log('Middleware 2')
    // res.send('Hello, express!')
    // @ts-ignore
    res.send(`Hello, express!: Requested at ${req.requestedAt}, ${req.fileContent}`)
})


app.listen(PORT, () =>{
    console.log(`The Express server is listening at port : ${PORT}`)
})