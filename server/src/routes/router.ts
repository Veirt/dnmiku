import { validateCreateAccount } from "../middlewares/validation.middleware";
import {createAccount} from "../controllers/register";
import express from "express";
import cors from "cors";

const router = express.Router();

// Router configuration
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// GET
router.get("/", (_, res) => res.json({ message: "pong" }));
router.get("/api/v1/accounts/:id", async (req, res) => {
});

// POST
router.post("/api/v1/accounts", validateCreateAccount, createAccount );

module.exports = router;
