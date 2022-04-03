import "./config";
import express from "express";
import connectDatabases from "./config/typeorm";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

connectDatabases().then(async () => {
    const app = express();

    const routerV1 = await import("./api/v1/routers");

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(
        session({
            secret: "test",
            resave: true,
            saveUninitialized: true,
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    await import("./api/v1/strategies/LocalStrategy");

    app.use("/v1", routerV1.default);

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () =>
        console.log(`Listening on http://localhost:${PORT}`)
    );
});
