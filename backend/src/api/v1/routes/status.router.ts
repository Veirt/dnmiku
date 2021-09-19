import * as statusController from "@api/v1/controllers/server.controller";
import { cacheResponse } from "@api/v1/middlewares/cache.middleware";
import { Router } from "express";

const router = Router();

router.get("/server", cacheResponse, statusController.getServerStatus);
router.get("/players", cacheResponse, statusController.getPlayerStatus);

export default router;
