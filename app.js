// Express Server
const express = require('express');
const app = express();

// .env
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});

// Express Session
const session = require('express-session')
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true,
        domain: 'dnmiku.com',
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));


// Helmet
const helmet = require('helmet');
app.use(helmet());

// Views
const path = require('path');
const assetsDirectory = path.join(__dirname, './assets');
app.use(express.static(assetsDirectory));
app.set('view engine', 'pug');

// Routes
app.use('/', require('./routes/routesGet'));
app.use('/', require('./routes/routesPost'));

// Start server 
app.listen(1111, () => {
    console.log("http://localhost:1111")
});