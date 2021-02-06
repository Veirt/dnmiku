import express from "express";
import { check, validationResult } from "express-validator";

import sql from "mssql";
const db = require("../core/db");

const urlencodedParser = express.urlencoded({ extended: true });
const router = express.Router();

// Get //
router.get("/login", (req, res) => {
  let user = req.session.user;
  if (user) {
    res.status(200).redirect("/dashboard");
    return;
  }

  let id = req.session.loginId;
  let error = {
    idError: req.session.error?.idError,
    passwordError: req.session.error?.passwordError,
  };
  let message = req.session.message;

  req.session.loginId = null;
  req.session.message = null;
  req.session.error = null;
  res.status(200).render("login", {
    message,
    error,
    id,
  });
});

// Post //

router.post(
  "/login",
  urlencodedParser,
  [
    check("id")
      .isAlphanumeric()
      .withMessage("Username must not contain special chars")
      .not()
      .isEmpty()
      .withMessage("Username cannot be empty"),

    check("password").not().isEmpty().withMessage("Password cannot be empty"),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    // If Error IS NOT Empty
    if (!errors.isEmpty()) {
      const alert = errors.array();
      for (let i in alert) {
        switch (alert[i].param) {
          case "id":
            var idError = alert[i].msg;
            break;
          case "password":
            var passwordError = alert[i].msg;
            break;
        }
      }
      req.session.error = { idError, passwordError };
      req.session.loginId = req.body.id;
      res.status(400).redirect("/login");
      return;
    }
    try {
      // Validate special chars once again
      if (!req.body.id.match(/^[0-9a-zA-Z]+$/)) {
        let idError = "Username must not contain special chars";
        req.session.error = { idError };
        req.session.loginId = req.body.id;
        res.status(400).redirect("/login");
        return;
      }

      let login = await db.poolPromise
        .request()
        .input("id", sql.NVarChar(50), req.body.id)
        .query(
          "SELECT * FROM DNMembership.dbo.Accounts WHERE AccountName = @id "
        );

      let getEncryptedPassword = await db.poolPromise
        .request()
        .input("vchPassphrase", sql.VarChar(12), req.body.password)
        .execute("DNMembership.dbo.EncryptPassword");

      const EncryptedPassword =
        getEncryptedPassword.recordset[0].EncryptedPassword;

      if (login.rowsAffected[0] < 1) {
        let idError = "Username doesn't exist";
        req.session.error = { idError };
        req.session.loginId = req.body.id;
        res.status(400).redirect("/login");
        return;
      }

      if (
        Buffer.compare(EncryptedPassword, login.recordset[0].Passphrase) === 0
      ) {
        // Store the user data in a session.
        req.session.user = login.recordset[0];
        req.session.opp = 1;
        res.status(200).redirect("/dashboard");
        return;
      }

      let passwordError = "Password is incorrect";
      req.session.error = { passwordError };
      req.session.loginId = req.body.id;
      res.status(400).redirect("/login");
      return;
    } catch (err) {
      console.log(`Unexpected error : ${err}`);
    }
  }
);

module.exports = router;
