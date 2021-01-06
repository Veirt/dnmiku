import express from "express";

const router = express.Router();
// Database
const sql = require("mssql");
const db = require("../core/db");

const moment = require("moment");

// Cors

// Type Declaration
declare module "express-session" {
	interface SessionData {
		user: {
			AccountID: number;
			AccountName: string;
			cash: number;
			claimDaily: 0 | 1;
		};
		opp: number;
		message: string | null;
		cash: number | null;
	}
}

router.get("/", async (req, res) => {
	try {
		let pool = await sql.connect(db.config);
		let getOnlinePlayer = await pool
			.request()
			.query(
				"SELECT COUNT(CertifyingStep) AS OnlinePlayer FROM DNMembership.dbo.DNAuth WHERE CertifyingStep = 2"
			);
		let getTotalAccount = await pool
			.request()
			.query(
				"SELECT COUNT(AccountID) AS TotalAccount FROM DNMembership.dbo.Accounts"
			);
		let getTotalCharacter = await pool
			.request()
			.query(
				"SELECT COUNT(CharacterID) AS TotalCharacter FROM DNMembership.dbo.Characters"
			);

		let nowOnline = getOnlinePlayer.recordset[0].OnlinePlayer;
		let nowTotalAccount = getTotalAccount.recordset[0].TotalAccount;
		let nowTotalCharacter = getTotalCharacter.recordset[0].TotalCharacter;

		// Check if the session is exist
		let user = req.session.user;
		if (user) {
			res.status(200).render("index_dash", {
				opp: req.session.opp,
				nowOnline: nowOnline,
				nowTotalAccount: nowTotalAccount,
				nowTotalCharacter: nowTotalCharacter,
			});
			return;
		}

		res.status(200).render("index", {
			nowOnline: nowOnline,
			nowTotalAccount: nowTotalAccount,
			nowTotalCharacter: nowTotalCharacter,
			datetime: moment().format("h:mm:ss A"),
		});
	} catch (err) {
		console.log(`Unexpected error : ${err}`);
	}
});

router.get("/register", (req, res) => {
	let user = req.session.user;
	if (user) {
		res.status(200).redirect("/dashboard");
		return;
	}
	res.status(200).render("register");
});

router.get("/login", (req, res) => {
	let user = req.session.user;
	if (user) {
		res.status(200).redirect("/dashboard");
		return;
	}
	let message = req.session.message;
	req.session.message = null;
	res.status(200).render("login", {
		message,
	});
});

router.get("/download", (req, res) => {
	res.status(200).render("download");
});

router.get("/launcher", (req, res) => {
	res.status(200).render("launcher");
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
