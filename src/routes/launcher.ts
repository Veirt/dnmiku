const express = require("express");

const router = express.Router();

router.get("/launcher", (_: any, res: any) => {
  res.status(200).render("launcher");
});

module.exports = router;
