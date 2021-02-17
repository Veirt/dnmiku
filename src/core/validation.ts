import * as db from "../core/db";
import { check } from "express-validator";
import sql from "mssql";

export const LoginValidationRules = [
  check("id")
    .isAlphanumeric()
    .withMessage("Username must not contain special chars")
    .not()
    .isEmpty()
    .withMessage("Username cannot be empty"),

  check("password").not().isEmpty().withMessage("Password cannot be empty"),
];

export const RegisterValidationRules = [
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
