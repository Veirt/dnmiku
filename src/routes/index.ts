import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  // Check if the session is exist
  let user = req.session.user;
  if (user) {
    res.status(200).render("index", {
      loggedInStatus: true,
    });
    return;
  }

  res.status(200).render("index");
});

router.get("/download", (_, res) => {
  res.status(200).render("download");
});

router.get("/logout", (req, res) => {
  // Check if the session is exist
  if (req.session.user) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    // If session doesn't exist
    res.redirect("/");
  }
});

module.exports = router;
