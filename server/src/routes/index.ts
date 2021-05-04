import routerConfig from "../config/router.config";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware";
import { validateCreateAccount } from "../middlewares/validation.middleware";
import { loginAccount, createAccount } from "../controllers/auth.controller";
import {
  createAdminAccount,
  deleteAccount,
  editAccount,
  getAccountById,
  getAccountData,
  getAccounts,
} from "../controllers/account.controller";
import express from "express";
import { getServerStatus } from "../controllers/server.controller";
import {
  deleteCharacter,
  editCharacter,
  getCharacterById,
  getCharacters,
} from "../controllers/character.controller";

const router = express.Router();
routerConfig(router);

router.get("/", (_, res) => res.json({ message: "pong" }));
router.get("/status", getServerStatus);

router.post("/auth", loginAccount);

router.get("/accounts", isAuthenticated, isAdmin, getAccounts);
router.post("/accounts", validateCreateAccount, createAccount);
router.post(
  "/accounts/admin",
  validateCreateAccount,
  isAuthenticated,
  isAdmin,
  createAdminAccount
);
router.get("/accounts/@me", isAuthenticated, getAccountData);
router.get("/accounts/:id", isAuthenticated, isAdmin, getAccountById);
router.patch("/accounts/:id", isAuthenticated, isAdmin, editAccount);
router.delete("/accounts/:id", isAuthenticated, isAdmin, deleteAccount);

router.get("/characters", isAuthenticated, isAdmin, getCharacters);
router.get("/characters/:id", isAuthenticated, isAdmin, getCharacterById);
router.patch("/characters/:id", isAuthenticated, isAdmin, editCharacter);
router.delete("/characters/:id", isAuthenticated, isAdmin, deleteCharacter);

module.exports = router;
