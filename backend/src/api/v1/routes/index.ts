import "@config/localStrategy.config"
import "@config/jwtStrategy.config"
import routerConfig from "@config/router.config"
import * as accountControllers from "@api/v1/controllers/account.controller"
import * as characterControllers from "@api/v1/controllers/character.controller"
import { createAccount, loginAccount } from "@api/v1/controllers/auth.controller"
import {
  getServerStatus,
  getPlayerStatus,
} from "@api/v1/controllers/server.controller"
import { isAdmin, isAuthenticated } from "@api/v1/middlewares/auth.middleware"
import { validateCreateAccount } from "@api/v1/middlewares/validation.middleware"
import express from "express"

const router = express.Router()
routerConfig(router)

router.get("/", (_, res) => res.json({ message: "pong" }))
router.get("/status/server", getServerStatus)
router.get("/status/players", getPlayerStatus)

router.post("/auth", loginAccount)

router.get(
  "/accounts",
  isAuthenticated,
  isAdmin,
  accountControllers.getAccounts
)
router.post("/accounts", validateCreateAccount, createAccount)
router.post(
  "/accounts/admin",
  isAuthenticated,
  isAdmin,
  accountControllers.createAdminAccount
)
router.get("/accounts/@me", isAuthenticated, accountControllers.getAccountData)
router.get(
  "/accounts/:id",
  isAuthenticated,
  isAdmin,
  accountControllers.getAccountById
)
router.patch(
  "/accounts/:id",
  isAuthenticated,
  isAdmin,
  accountControllers.editAccount
)
router.delete(
  "/accounts/:id",
  isAuthenticated,
  isAdmin,
  accountControllers.deleteAccount
)

router.get(
  "/characters",
  isAuthenticated,
  isAdmin,
  characterControllers.getCharacters
)
router.get(
  "/characters/:id",
  isAuthenticated,
  isAdmin,
  characterControllers.getCharacterById
)
router.patch(
  "/characters/:id",
  isAuthenticated,
  isAdmin,
  characterControllers.editCharacter
)
router.delete(
  "/characters/:id",
  isAuthenticated,
  isAdmin,
  characterControllers.deleteCharacter
)

module.exports = router
