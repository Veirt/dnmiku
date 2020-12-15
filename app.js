// Express Server
const express = require('express');
const app = express();



// .env
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});

const path = require('path');


// Views
const assetsDirectory = path.join(__dirname, './assets');
app.use(express.static(assetsDirectory));
app.set('view engine', 'pug');

// Routes
app.use('/', require('./routes/routes'));

// Start server 
app.listen(1111, () => {
    console.log("Your server started on port 1111")
});