import express from "express";

const router = express.Router();

// Database
const db = require("../core/db");

router.get("/", async (req, res) => {
	try {
		let getOnlinePlayer = await db.poolPromise
			.request()
			.query(
				"SELECT COUNT(CertifyingStep) AS OnlinePlayer FROM DNMembership.dbo.DNAuth WHERE CertifyingStep = 2"
			);
		let getTotalAccount = await db.poolPromise
			.request()
			.query(
				"SELECT COUNT(AccountID) AS TotalAccount FROM DNMembership.dbo.Accounts"
			);
		let getTotalCharacter = await db.poolPromise
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
		});
	} catch (err) {
		console.log(`Unexpected error : ${err}`);
	}
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
