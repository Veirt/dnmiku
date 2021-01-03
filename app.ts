import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import path from 'path'
import session from 'express-session'
import cors from 'cors'

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

// Cors
app.use(cors());

// Views
const publicDirectory = path.join(__dirname, 'public');
app.use(express.static(publicDirectory));
app.set('view engine', 'pug');

// Routes
app.use('/', require('./routes/routesGet'));
app.use('/', require('./routes/routesPost'));
app.use('/', require('./routes/routesDashboard'));

// Not found routes
app.use((req,res) => {
    res.status(404).render('error404');
});

// Forbidden routes
app.use((req,res) => {
    res.status(403).render('error403');
});
// Start server 
app.listen(1111, () => console.log("http://localhost:1111"));