const express = require('express');
const User = require('../core/user')
const router = express.Router()

const user = new User();


router.get('/', (req, res, next) => {
    res.render('index')
})
router.get('/login', (req, res, next) => {
    res.render('login')
})
router.get('/register', (req, res, next) => {
    res.render('register')
})


router.post('/login', (req, res, next) => {
    user.login(req.body.id, req.body.password, function (result) {
        res.json(req.body)
        if (result) {
            res.send('Logged in as : ' + result.username)
        } else {
            res.send('Username or password is incorrect')
        }
    })
})

router.post('/register', (req, res, next) => {
    res.json(req.body)
})


module.exports = router