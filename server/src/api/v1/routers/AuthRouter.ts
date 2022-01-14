import { Router } from "express";
import { localAuth, registerAccount } from "../controllers/AuthController";

const AuthRouter = Router();

AuthRouter.post("/local", localAuth);
AuthRouter.post("/register", registerAccount);

export default AuthRouter;
