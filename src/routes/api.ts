import express from "express";

const router = express.Router();

router.get("/api", (_, res) => {
  res.json({
    message: "pong",
  });
});

module.exports = router;
