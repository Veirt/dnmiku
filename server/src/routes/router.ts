import express from "express";

const router = express.Router();

router.get("/", (_, res) => res.json({ message: "pong" }));

module.exports = router;
