// @ts-check

const express = require('express')

const app = express()
app.use(express.json())
// app.use(express.static('src/public'))
app.set('views', 'src/views')
app.set('view engine', 'pug')

const PORT = 5000

const userRouter = require('./routers/user')

app.get('/', (req, res) => {
    //index는 views의 index.pug
    res.render('index', {
        message: 'Hello, pug!!!'
    })
})

app.use('/users', userRouter)
//static디렉토리의 파일과 router가 겹친 경우 미들웨어 실행 순서를 바꿔준다.(아래로 내림)
app.use('/public', express.static('src/public'))

//@ts-ignore
app.use((err, req, res, next) =>{
    res.statusCode = err.statusCode || 500
    res.send(err.message)
})


app.listen(PORT, () =>{
    console.log(`The Express server is listening at port : ${PORT}`)
})