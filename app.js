// Express Server
const express = require('express');
const app = express();

// Express Session
const session = require('express-session')
app.use(session({
    secret: "eXl00g33Xxlog33l1Tt7t7t7teE3X3X3xlo99",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

// .env
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});

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