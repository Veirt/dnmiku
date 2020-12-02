const express = require('express')
const session = require('express-session');
const path = require('path')
const pageRouter = require('./routes/pages')
const app = express()

app.use(express.urlencoded({
    extended: false
}))


// Web Assets
app.use(express.static(path.join(__dirname, 'assets')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// Index router
app.use('/', pageRouter);

// Error routers
app.use((req, res, next) => {
    var err = new Error('Page not found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send(err.message)
})

app.listen(8080)
module.exports = app