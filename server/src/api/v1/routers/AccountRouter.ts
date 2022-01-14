import { Router } from "express";
import {
    createAccount,
    getAccountById,
    getAccounts,
    getMyAccount,
} from "../controllers/AccountController";
import { isAuthenticated } from "../middlewares/AuthMiddleware";

const AccountRouter = Router();

AccountRouter.use(isAuthenticated);

AccountRouter.get("/", getAccounts);
AccountRouter.get("/@me", getMyAccount);
AccountRouter.get("/:id", getAccountById);
AccountRouter.post("/", createAccount);

export default AccountRouter;
