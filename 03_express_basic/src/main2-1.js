// @ts-check

const express = require('express')

// const bodyParser = require('body-parser') deprecated

const userRouter = express.Router()

const app = express()

const PORT = 5000

//body-parser 없을 때 => TypeError: Cannot destructure property 'nickname' of 'req.body' as it is undefined.
// app.use(bodyParser.json())

app.use(express.json())

// app.get('/users', (req, res) =>{
//     res.send('User list')
// })

// app.get('/users:id', (req, res) =>{
//     res.send('User info with ID')
// })

// app.post('/users', (req, res) =>{
//     res.send('User registered.')
// })

userRouter.get('/', (req, res) =>{
    res.send('User list')
})

const USERS = {
    15: {
        nickname: 'foo',
    },
}


userRouter.param('id', (req, res, next, value) => {
    console.log(`id parameter`, value)
    // @ts-ignore
    req.user = USERS[value]
    next()
})

userRouter.get('/:id', (req, res) =>{
    console.log('userRouter get ID')
    
    // res.send('User info with ID')
    // @ts-ignore
    // res.send('User info with ID '+ req.user)
    // @ts-ignore
    res.send(req.user)
})


userRouter.post('/', (req, res) =>{
    res.send('User registered.')
})

// 포스트맨 쓸 때, BODY => JSON인지 확인할 것
userRouter.post('/:id/nickname', (req, res) =>{
    // req.body: {"nickname" : "bar"}
    console.log('req>>>>>'+req)
    // @ts-ignore
    const { user } = req
    console.log('user >>>>>', user)
    // body-parser 없을 때 => TypeError: Cannot destructure property 'nickname' of 'req.body' as it is undefined.
    const { nickname } = req.body
    console.log('nickname >>>>>', req.body)
    
    user.nickname = nickname

    res.send(`User nickname updated: ${nickname}`)
})

app.use('/users', userRouter)

app.listen(PORT, () =>{
    console.log(`The Express server is listening at port : ${PORT}`)
})