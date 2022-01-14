import { Router } from "express";
import AccountRouter from "./AccountRouter";
import AuthRouter from "./AuthRouter";

const router = Router();

router.use("/accounts", AccountRouter);
router.use("/auth", AuthRouter);

export default router;
