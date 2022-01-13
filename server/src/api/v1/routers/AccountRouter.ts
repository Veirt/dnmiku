import { Router } from "express";
import {
    createAccount,
    getAccountById,
    getAccounts,
} from "../controllers/AccountController";

const AccountRouter = Router();

AccountRouter.get("/", getAccounts);
AccountRouter.get("/:id", getAccountById);
AccountRouter.post("/", createAccount);

export default AccountRouter;
