import { Router } from "express";
import { localAuth } from "../controllers/AuthController";

const AuthRouter = Router();

AuthRouter.post("/local", localAuth);

export default AuthRouter;
