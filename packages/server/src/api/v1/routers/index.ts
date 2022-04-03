import { Router } from "express";
import AccountRouter from "./AccountRouter";
import AuthRouter from "./AuthRouter";
import GameRouter from "./GameRouter";

const router = Router();

router.use("/accounts", AccountRouter);
router.use("/auth", AuthRouter);
router.use("/game", GameRouter);

export default router;
