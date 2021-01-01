import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import path from 'path'
import session from 'express-session'
// Express Server
const app = express();

// .env
dotenv.config({
    path: './.env'
});

// Express Session
app.use(session({
    secret: process.env.SECRET_SESSION ?? '',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));

// Helmet
app.use(helmet());

// Views
const assetsDirectory = path.join(__dirname, './assets');
app.use(express.static(assetsDirectory));
app.set('view engine', 'pug');

// Routes
app.use('/', require('./routes/routesGet'));
app.use('/', require('./routes/routesPost'));

// Start server 
app.listen(1111, () => console.log("http://localhost:1111"));