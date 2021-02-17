import http from "http";
import https from "https";
import path from "path";
import { RedisStore, redisClient } from "./core/redis";
import { credentials } from "./core/protocol";
import session from "express-session";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";

// Express Server
export const app = express();

// .env
dotenv.config({
  path: "./.env",
});

// Express Session
app.use(
  session({
    name: "sessionId",
    store: new RedisStore({ client: redisClient }),
    proxy: process.env.NODE_ENV === "PROD",
    secret: process.env.SECRET_SESSION ?? "",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "PROD",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

if (process.env.NODE_ENV === "PROD") {
  app.set("trust proxy", 1);
  console.log("Setup nginx trust proxy");
}

// Helmet
app.use(helmet());

// Views
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));
app.set("view engine", "pug");

// Routes
app.use("/", require("./routes/index"));
app.use("/", require("./routes/register"));
app.use("/", require("./routes/login"));
app.use("/", require("./routes/launcher"));
app.use("/", require("./routes/dashboard"));
app.use("/", require("./routes/setting"));

// API
app.use("/", require("./routes/api"));
app.use("/", require("./routes/api/status"));
app.use("/", require("./routes/api/players"));

// Custom Error Page
app.use((_, res) => res.status(404).render("error404"));
app.use((_, res) => res.status(403).render("error403"));

// Start server
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

console.log(`Production environment : ${process.env.NODE_ENV === "PROD"}`);

httpServer.listen(8080, () => console.log("\nHTTP Server listen on port 8080. http://localhost:8080"));

httpsServer.listen(8081, () => console.log("\nHTTPS Server listen on port 8081. https://localhost:8081"));
