import * as db from "../../core/db";
import express from "express";

const router = express.Router();

router.get("/api/players", async (_, res) => {
  try {
    let getOnlinePlayer = await db.poolPromise
      .request()
      .query("SELECT COUNT(CertifyingStep) AS OnlinePlayer FROM DNMembership.dbo.DNAuth WHERE CertifyingStep = 2");
    let getTotalAccount = await db.poolPromise
      .request()
      .query("SELECT COUNT(AccountID) AS TotalAccount FROM DNMembership.dbo.Accounts");
    let getTotalCharacter = await db.poolPromise
      .request()
      .query("SELECT COUNT(CharacterID) AS TotalCharacter FROM DNMembership.dbo.Characters");

    const players = {
      nowOnline: getOnlinePlayer.recordset[0].OnlinePlayer,
      nowTotalAccount: getTotalAccount.recordset[0].TotalAccount,
      nowTotalCharacter: getTotalCharacter.recordset[0].TotalCharacter,
    };
    res.json(players);
  } catch (err) {
    console.log(`Unexpected error : ${err}`);
  }
});

module.exports = router;
