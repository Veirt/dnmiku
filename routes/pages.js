const express = require('express');
const router = express.Router()

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
    res.json(req.body)
})

router.post('/register', (req, res, next) => {
    res.json(req.body)
})


module.exports = router