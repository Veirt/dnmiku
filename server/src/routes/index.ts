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

const router = express.Router();
routerConfig(router);

router.get("/", (_, res) => res.json({ message: "pong" }));

router.post("/api/v1/auth", loginAccount);

router.get("/api/v1/accounts", isAuthenticated, isAdmin, getAccounts);
router.post("/api/v1/accounts", validateCreateAccount, createAccount);
router.post(
  "/api/v1/accounts/admin",
  validateCreateAccount,
  isAuthenticated,
  isAdmin,
  createAdminAccount
);
router.get("/api/v1/accounts/@me", isAuthenticated, getAccountData);
router.get("/api/v1/accounts/:id", isAuthenticated, isAdmin, getAccountById);
router.patch("/api/v1/accounts/:id", isAuthenticated, isAdmin, editAccount);
router.delete("/api/v1/accounts/:id", isAuthenticated, isAdmin, deleteAccount);

module.exports = router;
