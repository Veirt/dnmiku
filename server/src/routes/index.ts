import routerConfig from "../config/router.config";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { validateCreateAccount } from "../middlewares/validation.middleware";
import { createAccount } from "../controllers/register.controller";
import { loginAccount } from "../controllers/login.controller";
import { getAccountData } from "../controllers/account.controller";
import express from "express";

const router = express.Router();
routerConfig(router);

router.get("/", (_, res) => res.json({ message: "pong" }));

router.post("/api/v1/accounts", validateCreateAccount, createAccount);

router.post("/api/v1/auth", loginAccount);

router.get("/api/v1/accounts/@me", isAuthenticated, getAccountData);

module.exports = router;
