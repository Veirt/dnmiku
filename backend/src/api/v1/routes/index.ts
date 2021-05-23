import "@config/localStrategy.config"
import "@config/jwtStrategy.config"
import configureRouter from "@config/router.config"
import accountsRouter from "@api/v1/routes/accounts.router"
import charactersRouter from "@api/v1/routes/characters.router"
import OAuthRouter from "@api/v1/routes/oauth.router"
import * as statusController from "@api/v1/controllers/server.controller"
import { checkAuth, loginAccount } from "@api/v1/controllers/auth.controller"
import { cacheResponse } from "@api/v1/middlewares/cache.middleware"
import { Router } from "express"

const router = Router()
configureRouter(router)

router.use("/oauth", OAuthRouter)
router.use("/accounts", accountsRouter)
router.use("/characters", charactersRouter)

router.get("/", (_, res) => res.json({ message: "pong" }))

router.get("/status/server", cacheResponse, statusController.getServerStatus)
router.get("/status/players", cacheResponse, statusController.getPlayerStatus)

router.post("/auth", checkAuth)
router.post("/auth/local", loginAccount)

export default router
