import "./config";
import express from "express";
import connectDatabases from "./config/typeorm";
import session from "express-session";
import passport from "passport";

connectDatabases().then(async () => {
    const app = express();

    const routerV1 = await import("./api/v1/routers");

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
        session({ secret: "test", resave: true, saveUninitialized: false })
    );

    await import("./api/v1/strategies/LocalStrategy");
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/v1", routerV1.default);

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () =>
        console.log(`Listening on http://localhost:${PORT}`)
    );
});
