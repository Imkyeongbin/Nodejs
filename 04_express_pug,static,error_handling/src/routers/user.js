// @ts-check

const express = require('express')

const router = express.Router()


const USERS = {
    15: {
        nickname: 'foo',
    },
    16: {
        nickname: 'bar',
    }
}

router.get('/', (req, res) =>{
    res.send('User list')
})

// async 함수는 try catch로 감싸준다.
router.param('id', async (req, res, next, value) => {
    try {
        console.log(`id parameter`, value)
        // @ts-ignore
        const user = USERS[value]
        
        if (!user){
            const err = new Error('User not found.')
            
            // @ts-ignore
            err.statusCode = 404
            throw err
        }
        
        // @ts-ignore
        req.user = user
        next()
        
    } catch (err) {
        next(err)
    }
})


// /users/1

router.get('/:id', (req, res) =>{
    // req.headers.accept
    const resMimeType = req.accepts(['json', 'html'])
    
    if (resMimeType === 'json'){
        console.log('json')
        // @ts-ignore
        res.send(req.user)
    } else if(resMimeType === 'html'){
        console.log('html')
        res.render('user-profile',{
            // @ts-ignore
            nickname: req.user.nickname,
        })
    }
    
})


router.post('/', (req, res) =>{
    res.send('User registered.')
})

// 포스트맨 쓸 때, BODY => JSON인지 확인할 

router.post('/:id/nickname', (req, res) =>{
    // req.body: {"nickname" : "bar"}
    // @ts-ignore
    const { user } = req
    const { nickname } = req.body
    
    user.nickname = nickname
    
    res.send(`User nickname updated: ${nickname}`)
})

module.exports = router