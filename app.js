"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const redis_1 = __importDefault(require("redis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const RedisStore = connect_redis_1.default(express_session_1.default);
const redisClient = redis_1.default.createClient({
    port: 6379,
    host: process.env.REDIS_HOST || "localhost",
});
const privateKey = fs_1.default.readFileSync("ssl/dnmiku.key", "utf8");
const certificate = fs_1.default.readFileSync("ssl/dnmiku.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };
const app = express_1.default();
dotenv_1.default.config({
    path: "./.env",
});
app.use(express_session_1.default({
    store: new RedisStore({ client: redisClient }),
    proxy: process.env.NODE_ENV === "PROD" ? true : false,
    secret: (_a = process.env.SECRET_SESSION) !== null && _a !== void 0 ? _a : "",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "PROD" ? true : false,
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    },
}));
if (process.env.NODE_ENV === "PROD") {
    app.set("trust proxy", 1);
    console.log("Setup nginx trust proxy");
}
app.use(helmet_1.default());
const publicDirectory = path_1.default.join(__dirname, "public");
app.use(express_1.default.static(publicDirectory));
app.set("view engine", "pug");
app.use("/", require("./routes/routesGet"));
app.use("/", require("./routes/routesRegister"));
app.use("/", require("./routes/routesLogin"));
app.use("/", require("./routes/routesDashboard"));
app.use((req, res) => res.status(404).render("error404"));
app.use((req, res) => res.status(403).render("error403"));
const httpServer = http_1.default.createServer(app);
const httpsServer = https_1.default.createServer(credentials, app);
console.log(`Production environment : ${process.env.NODE_ENV === "DEV" ? false : true}`);
httpServer.listen(3333, () => console.log("\nHTTP Server listen on port 3333. http://localhost:3333"));
httpsServer.listen(2222, () => console.log("\nHTTPS Server listen on port 2222. https://localhost:2222"));
