import * as db from "../core/db";
import { check, validationResult } from "express-validator";
import sql from "mssql";
import express, { urlencoded } from "express";

const router = express.Router();

const urlEncodedParser = urlencoded({ extended: true });

router.get("/setting", (req, res) => {
  if (req.session.user) {
    let error = {
      previousPasswordError: req.session.error?.previousPasswordError,
      newPasswordError: req.session.error?.newPasswordError,
    };
    let message = req.session.message;

    req.session.message = null;
    req.session.error = null;
    res.render("setting", {
      error,
      message,
    });
  } else {
    res.status(403).render("error403");
  }
});

const ValidationRules = [
  check("previousPassword").not().isEmpty().withMessage("Previous Password cannot be empty"),
  check("newPassword")
    .not()
    .isEmpty()
    .withMessage("New Password cannot be empty")
    .isLength({ min: 6, max: 14 })
    .withMessage("Password must be 6-14 chars"),
];

router.post("/setting", urlEncodedParser, ValidationRules, async (req: any, res: any) => {
  let user = req.session.user;
  if (user) {
    const errors = validationResult(req);
    // If Error IS NOT Empty
    let previousPasswordError, newPasswordError;
    if (!errors.isEmpty()) {
      const alert = errors.array();
      for (let i in alert) {
        switch (alert[i].param) {
          case "previousPassword":
            previousPasswordError = alert[i].msg;
            break;
          case "newPassword":
            newPasswordError = alert[i].msg;
            break;
        }
      }
      req.session.error = { previousPasswordError, newPasswordError };
      res.status(400).redirect("/setting");
      return;
    }
    try {
      let getPreviousEncryptedPassword = await db.poolPromise
        .request()
        .input("vchPassphrase", sql.VarChar(12), req.body.previousPassword)
        .execute("DNMembership.dbo.__Encrypt_Password");

      let getPassword = await db.poolPromise
        .request()
        .input("id", sql.NVarChar(50), user.AccountName)
        .query("SELECT Passphrase FROM DNMembership.dbo.Accounts WHERE AccountName = @id");

      const previousEncryptedPassword = getPreviousEncryptedPassword.recordset[0].EncryptedPassword;

      if (Buffer.compare(previousEncryptedPassword, getPassword.recordset[0].Passphrase) === 0) {
        await db.poolPromise
          .request()
          .input("previousPassword", sql.VarBinary(20), previousEncryptedPassword)
          .input("id", sql.NVarChar(50), user.AccountName)
          .input("newPassword", sql.VarChar(12), req.body.newPassword)
          .query(
            "UPDATE DNMembership.dbo.Accounts SET Passphrase = CONVERT(BINARY(20),HashBytes('MD5', @newPassword),2) WHERE AccountName = @id AND Passphrase = @previousPassword"
          );
        req.session.message = "Successfully changed password";
        res.status(200).redirect("/setting");
        return;
      }
      let previousPasswordError = "Password incorrect";
      req.session.error = { previousPasswordError };
      res.status(400).redirect("/setting");
    } catch (err) {
      console.log(`Unexpected Error : ${err}`);
    }
  }
});

module.exports = router;
