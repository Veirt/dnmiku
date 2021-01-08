import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";

import helmet from "helmet";

import fs from "fs";
import http from "http";
import https from "https";

import redis from "redis";
import connectRedis from "connect-redis";

// Redis
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
	port: 6379,
	host: process.env.REDIS_HOST || "localhost",
});

// HTTPS
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
		store: new RedisStore({ client: redisClient }),
		proxy: process.env.NODE_ENV === "PROD" ? true : false,
		secret: process.env.SECRET_SESSION ?? "",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV === "PROD" ? true : false,
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
const publicDirectory = path.join(__dirname, "public");
app.use(express.static(publicDirectory));
app.set("view engine", "pug");

// Routes
app.use("/", require("./routes/routesGet"));
app.use("/", require("./routes/routesRegister"));
app.use("/", require("./routes/routesLogin"));
app.use("/", require("./routes/routesDashboard"));
app.use((req, res) => res.status(404).render("error404"));
app.use((req, res) => res.status(403).render("error403"));

// Start server
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

console.log(
	`Production environment : ${process.env.NODE_ENV === "DEV" ? false : true}`
);

httpServer.listen(3333, () =>
	console.log("\nHTTP Server listen on port 3333. http://localhost:3333")
);

httpsServer.listen(2222, () =>
	console.log("\nHTTPS Server listen on port 2222. https://localhost:2222")
);
