import * as db from "../core/db";
import express from "express";
import sql from "mssql";
import { RegisterValidationRules } from "../core/validation";
import { validationResult } from "express-validator";

const router = express.Router();

const urlencodedParser = express.urlencoded({ extended: true });

router.get("/register", (req, res) => {
  if (req.session.user) {
    res.status(200).redirect("/dashboard");
    return;
  }

  res.status(200).render("register");
});

// Register Validation
router.post("/register", urlencodedParser, RegisterValidationRules, async (req: any, res: any) => {
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

    req.session.message = "Registered successfully";
    res.redirect("/login");
  } catch (err) {
    console.log(`Unexpected error : ${err}`);
  }
});

module.exports = router;
