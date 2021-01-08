import express from "express";
import { check, validationResult } from "express-validator";
import bodyParser from "body-parser";

const router = express.Router();

// Database
const sql = require("mssql");
const db = require("../core/db");

const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get("/register", (req, res) => {
	let user = req.session.user;
	if (user) {
		res.status(200).redirect("/dashboard");
		return;
	}

	res.status(200).render("register");
});

// Register Validation
router.post(
	"/register",
	urlencodedParser,
	[
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
				if (!mentionName.match(/^[0-9a-z]+$/)) {
					throw new Error("Username must not contain special chars");
				}
				const value = await isMentionNameInUse(mentionName);
				if (value) {
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
				const value = await isMentionEmailInUse(mentionEmail);
				if (value) {
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
	],
	async (req: any, res: any) => {
		const errors = validationResult(req);
		// If Error IS NOT Empty
		if (!errors.isEmpty()) {
			const alert = errors.array();
			for (let i in alert) {
				if (alert[i].param === "id") {
					var idError = alert[i].msg;
				} else if (alert[i].param === "password") {
					var passwordError = alert[i].msg;
				} else if (alert[i].param === "email") {
					var emailError = alert[i].msg;
				}
			}
			res.status(400).render("register", {
				idError,
				emailError,
				passwordError,
				id: req.body.id,
				email: req.body.email,
			});
		} else {
			try {
				await db.poolPromise
					.request()
					.input("id", sql.NVarChar(50), req.body.id)
					.input("password", sql.VarChar(12), req.body.password)
					.input("email", sql.VarChar(50), req.body.email)
					.query(
						"INSERT INTO DNMembership.dbo.Accounts (AccountName, AccountLevelCode, CharacterCreateLimit, CharacterMaxCount, RegisterDate, PublisherCode, Passphrase, mail) VALUES (@id, 99, 4, 8, GETDATE(), 0, CONVERT(BINARY(20),HashBytes('MD5',@password),2), @email)"
					);

				req.session.message = "Registered succesfully";
				res.redirect("/login");
			} catch (err) {
				console.log(`Unexpected error : ${err}`);
			}
		}
	}
);

function isMentionNameInUse(mentionName: String) {
	return new Promise((resolve, reject) => {
		sql.connect(db.config, (err: Error) => {
			if (err) {
				console.log(`Unexpected error : ${err}`);
				return reject;
			} else {
				new sql.Request()
					.input("id", sql.NVarChar(50), mentionName)
					.query(
						"SELECT COUNT(AccountName) AS ExistedAccountName FROM DNMembership.dbo.Accounts WHERE AccountName = @id",
						(err: Error, result: { recordset: any }) => {
							if (err) {
								return reject;
							} else {
								return resolve(result.recordset[0].ExistedAccountName > 0);
							}
						}
					);
			}
		});
	});
}

function isMentionEmailInUse(mentionEmail: String) {
	return new Promise((resolve, reject) => {
		sql.connect(db.config, (err: Error) => {
			if (err) {
				console.log(`Unexpected error : ${err}`);
				return reject;
			} else {
				new sql.Request()
					.input("email", sql.VarChar(50), mentionEmail)
					.query(
						"SELECT COUNT(mail) AS ExistedEmail FROM DNMembership.dbo.Accounts WHERE mail = @email",
						(err: Error, result: { recordset: any }) => {
							if (err) {
								return reject;
							} else {
								return resolve(result.recordset[0].ExistedEmail > 0);
							}
						}
					);
			}
		});
	});
}

module.exports = router;
