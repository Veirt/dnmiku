// Express Server
const express = require('express');
const app = express();

const sql = require('mssql');
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB,
    options: {
        enableArithAbort: true,
        encrypt: true
    }
}
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