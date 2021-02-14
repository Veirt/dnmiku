import express from "express";
import { check, validationResult } from "express-validator";
import sql from "mssql";
import * as db from "../core/db";

const router = express.Router();

const urlencodedParser = express.urlencoded({ extended: true });

router.get("/register", (req, res) => {
  if (req.session.user) {
    res.status(200).redirect("/dashboard");
    return;
  }

  res.status(200).render("register");
});

const ValidationRules = [
  // ID Validation
  check("id")
    .isLength({ min: 6, max: 12 })
    .withMessage("Username must be 6-12 chars")
    .isAlphanumeric()
    .withMessage("Username must not contain special chars")
    .not()
    .isEmpty()
    .withMessage("Username cannot be empty")
    .custom(async (mentionName: string) => {
      if (!mentionName.match(/^[0-9a-zA-Z]+$/)) {
        throw new Error("Username must not contain special chars");
      }
      if (await isMentionNameInUse(mentionName)) {
        throw new Error("Username already exists");
      }
    }),
  // Email validation
  check("email")
    .isEmail()
    .withMessage("Email is not valid")
    .not()
    .isEmpty()
    .withMessage("Email cannot be empty")
    .custom(async (mentionEmail: string) => {
      if (await isMentionEmailInUse(mentionEmail)) {
        throw new Error("Email already exists");
      }
    }),
  // Password Validation
  check("password")
    .isLength({ min: 6, max: 14 })
    .withMessage("Password must be 6-14 chars")
    .custom((value, { req }) => value === req.body.repeatPassword)
    .withMessage("Passwords do not match")
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty"),
];

// Register Validation
router.post("/register", urlencodedParser, ValidationRules, async (req: any, res: any) => {
  const errors = validationResult(req);
  // If Error IS NOT Empty
  if (!errors.isEmpty()) {
    const alert = errors.array();
    let idError, passwordError, emailError;
    for (let i in alert) {
      switch (alert[i].param) {
        case "id":
          idError = alert[i].msg;
          break;
        case "password":
          passwordError = alert[i].msg;
          break;
        case "email":
          emailError = alert[i].msg;
      }
    }
    res.status(400).render("register", {
      idError,
      emailError,
      passwordError,
      id: req.body.id,
      email: req.body.email,
    });
    return;
  }
  try {
    await db.poolPromise
      .request()
      .input("id", sql.NVarChar(50), req.body.id)
      .input("password", sql.VarChar(12), req.body.password)
      .input("email", sql.VarChar(50), req.body.email)
      .execute("DNMembership.dbo.__RegisterProcedure");

    req.session.message = "Registered succesfully";
    res.redirect("/login");
  } catch (err) {
    console.log(`Unexpected error : ${err}`);
  }
});

function isMentionNameInUse(mentionName: String) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.poolPromise
        .request()
        .input("id", sql.NVarChar(50), mentionName)
        .query(
          "SELECT COUNT(AccountName) AS ExistedAccountName FROM DNMembership.dbo.Accounts WHERE AccountName = @id"
        );
      return resolve(result.recordset[0].ExistedAccountName > 0);
    } catch (err) {
      console.log(`Unexpected error : ${err}`);
      return reject;
    }
  });
}

function isMentionEmailInUse(mentionEmail: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.poolPromise
        .request()
        .input("email", sql.VarChar(50), mentionEmail)
        .query("SELECT COUNT(mail) AS ExistedEmail FROM DNMembership.dbo.Accounts WHERE mail = @email");
      return resolve(result.recordset[0].ExistedEmail > 0);
    } catch (err) {
      console.log(`Unexpected error : ${err}`);
      return reject;
    }
  });
}

module.exports = router;
