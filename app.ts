import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";
import session from "express-session";
import cors from "cors";
import fs from "fs";
import http from "http";
import https from "https";

// https
const privateKey = fs.readFileSync("ssl/dnmiku.key", "utf8");
const certificate = fs.readFileSync("ssl/dnmiku.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };
// Express Server
const app = express();

// .env
dotenv.config({
  path: "./.env",
});

// Express Session
app.use(
  session({
    proxy: process.env.NODE_ENV === "PROD" ? true : false,
    secret: process.env.SECRET_SESSION ?? "",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

console.log(process.env.NODE_ENV === "DEV" ? false : true);
// Helmet and cors
app.use(helmet());
app.use(cors());

// Views
const publicDirectory = path.join(__dirname, "public");
app.use(express.static(publicDirectory));
app.set("view engine", "pug");

// Routes
app.use("/", require("./routes/routesGet"));
app.use("/", require("./routes/routesPost"));
app.use("/", require("./routes/routesDashboard"));
app.use((req, res) => res.status(404).render("error404"));
app.use((req, res) => res.status(403).render("error403"));

// Start server

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(1111, () => console.log("HTTP Server listen on port 1111"));
httpsServer.listen(2222, () => console.log("HTTP Server listen on port 2222"));
