import { Router } from "express";
import {
    createAccount,
    getAccountById,
    getAccounts,
    getMyAccount,
} from "../controllers/AccountController";
import { isAdmin, isAuthenticated } from "../middlewares/AuthMiddleware";

const AccountRouter = Router();

AccountRouter.use(isAuthenticated);

AccountRouter.get("/", isAdmin, getAccounts);
AccountRouter.get("/@me", getMyAccount);
AccountRouter.get("/:id", isAdmin, getAccountById);
AccountRouter.post("/", isAdmin, createAccount);

export default AccountRouter;
