import { checkAuth, loginAccount } from "@api/v1/controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/", checkAuth);
router.post("/local", loginAccount);

export default router;
