import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import schedule from "node-schedule";
const router = express.Router();
// Database
const sql = require("mssql");
const db = require("../core/db");

const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.use(cors());

// Daily
const resetDaily = schedule.scheduleJob("@daily", async () => {
	try {
		let pool = await sql.connect(db.config);
		await pool
			.request()
			.query("UPDATE DNMembership.dbo.Accounts SET claimDaily = 0");
		console.log("Daily has been resetted");
	} catch (err) {
		console.log(err);
	}
});

router.get("/dashboard", async (req, res) => {
	let user = req.session.user;
	if (user) {
		// Refresh session when reload
		try {
			let pool = await sql.connect(db.config);
			let login = await pool
				.request()
				.input("id", sql.NVarChar(50), user.AccountName)
				.query(
					"SELECT AccountID, AccountName, LastLoginDate, LastLogoutDate, RegisterDate, mail, cash, claimDaily FROM DNMembership.dbo.Accounts WHERE AccountName = @id "
				);

			let getCharList = await pool
				.request()
				.input("intAccountID", sql.Int, user.AccountID)
				.execute("DNMembership.dbo.checkCashPoint");
			let chars = getCharList.recordset;

			req.session.user = login.recordset[0];
			user = req.session.user;
			let gotCash = req.session.cash;
			req.session.cash = null;

			res.status(200).render("dashboard", {
				opp: req.session.opp,
				user,
				chars,
				gotCash,
			});
		} catch (err) {
			console.log(err);
		}
	} else {
		res.status(403).render("error403");
	}
});

router.post("/dashboard/api/cash", async (req, res) => {
	let user = req.session.user;
	if (user) {
		// Random amount cash 0-10000
		let randomAmountCash = Math.floor(Math.random() * 10000);
		if (user.claimDaily === 1) {
			res.status(403).redirect("/");
		} else {
			try {
				let pool = await sql.connect(db.config);
				let claimCash = await pool
					.request()
					.input("id", sql.NVarChar(50), user.AccountName)
					.input("randomAmountCash", sql.Int, randomAmountCash)
					.query(
						"UPDATE DNMembership.dbo.Accounts SET cash = cash + @randomAmountCash, claimDaily = 1 WHERE AccountName = @id"
					);

				let login = await pool
					.request()
					.input("id", sql.NVarChar(50), user.AccountName)
					.query(
						"SELECT AccountID, AccountName, LastLoginDate, LastLogoutDate, RegisterDate, mail, cash, claimDaily FROM DNMembership.dbo.Accounts WHERE AccountName = @id "
					);

				req.session.user = login.recordset[0];
				user = req.session.user;
				req.session.cash = randomAmountCash;
				res.redirect("/dashboard");
			} catch (err) {
				console.log(err);
			}
		}
	} else {
		res.status(403).render("error403");
	}
});

router.post("/dashboard/api/ftg", urlencodedParser, async (req, res) => {
	let user = req.session.user;
	if (user) {
		try {
			let pool = await sql.connect(db.config);

			let buyFTG = await pool
				.request()
				.input("CharacterID", sql.BigInt, parseInt(req.body.CharacterID))
				.query(
					"UPDATE DNWorld.dbo.CharacterStatus SET Fatigue = Fatigue+5000 WHERE CharacterID = @CharacterID"
				);

			let reducePoint = await pool
				.request()
				.input("CharacterID", sql.BigInt, parseInt(req.body.CharacterID))
				.query(
					"UPDATE DNWorld.dbo.Points SET Point = Point-1000 WHERE CharacterID = @CharacterID AND PointCode = 19"
				);

			res.redirect("/dashboard");
		} catch (err) {
			res.redirect("/dashboard");
		}
	} else {
		res.redirect("/");
	}
});

module.exports = router;
