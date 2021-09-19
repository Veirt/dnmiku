import "@config/localStrategy.config";
import "@config/jwtStrategy.config";

import configureRouter from "@config/router.config";
import statusRouter from "@api/v1/routes/status.router";
import accountsRouter from "@api/v1/routes/accounts.router";
import charactersRouter from "@api/v1/routes/characters.router";
import authRouter from "@api/v1/routes/auth.router";
import OAuthRouter from "@api/v1/routes/oauth.router";

import { Router } from "express";

const router = Router();
configureRouter(router);

router.get("/", (_, res) => res.json({ message: "pong" }));

router.use("/auth", authRouter);
router.use("/oauth", OAuthRouter);
router.use("/accounts", accountsRouter);
router.use("/characters", charactersRouter);
router.use("/status", statusRouter);

export default router;
