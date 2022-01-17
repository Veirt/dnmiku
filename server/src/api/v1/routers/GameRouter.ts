import { Router } from "express";
import {
    loginInGame,
    balanceInGame,
    payInGame,
} from "../controllers/GameController";

const GameRouter = Router();

GameRouter.post("/login", loginInGame);
GameRouter.post("/balance", balanceInGame);
GameRouter.post("/pay", payInGame);

export default GameRouter;
