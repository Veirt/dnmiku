import express from "express";
import sql from "mssql";
import schedule from "node-schedule";
import * as db from "../core/db";

const router = express.Router();
const urlencodedParser = express.urlencoded({ extended: true });

// Daily
schedule.scheduleJob("@daily", async () => {
  try {
    await db.poolPromise
      .request()
      .query("UPDATE DNMembership.dbo.Accounts SET claimDaily = 0");
    console.log("Daily has been resetted");
  } catch (err) {
    console.log(`Unexpected error : ${err}`);
  }
});

router.get("/dashboard", async (req, res) => {
  let user = req.session.user;
  if (user) {
    // Refresh session when reload
    try {
      let login = await db.poolPromise
        .request()
        .input("id", sql.NVarChar(50), user.AccountName)
        .execute("DNMembership.dbo.__LoginProcedure");

      let getCharList = await db.poolPromise
        .request()
        .input("intAccountID", sql.Int, user.AccountID)
        .execute("DNMembership.dbo.__Check_CashPoint");
      let chars = getCharList.recordset;

      req.session.user = login.recordset[0];
      user = req.session.user;
      let gotCash = req.session.cash;
      req.session.cash = null;

      res.status(200).render("dashboard", {
        user,
        chars,
        gotCash,
      });
    } catch (err) {
      console.log(`Unexpected error : ${err}`);
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
        await db.poolPromise
          .request()
          .input("id", sql.NVarChar(50), user.AccountName)
          .input("randomAmountCash", sql.Int, randomAmountCash)
          .query(
            "UPDATE DNMembership.dbo.Accounts SET cash = cash + @randomAmountCash, claimDaily = 1 WHERE AccountName = @id"
          );

        let login = await db.poolPromise
          .request()
          .input("id", sql.NVarChar(50), user.AccountName)
          .execute("DNMembership.dbo.__LoginProcedure");

        req.session.user = login.recordset[0];
        user = req.session.user;
        req.session.cash = randomAmountCash;
        res.redirect("/dashboard");
      } catch (err) {
        console.log(`Unexpected error : ${err}`);
      }
    }
  } else {
    res.status(403).render("error403");
  }
});

router.post("/dashboard/api/ftg", urlencodedParser, async (req, res) => {
  if (req.session.user) {
    try {
      await db.poolPromise
        .request()
        .input("CharacterID", sql.BigInt, parseInt(req.body.CharacterID))
        .query(
          "UPDATE DNWorld.dbo.CharacterStatus SET Fatigue = Fatigue+5000 WHERE CharacterID = @CharacterID"
        );

      await db.poolPromise
        .request()
        .input("CharacterID", sql.BigInt, parseInt(req.body.CharacterID))
        .query(
          "UPDATE DNWorld.dbo.Points SET Point = Point-1000 WHERE CharacterID = @CharacterID AND PointCode = 19"
        );

      res.redirect("/dashboard");
    } catch (err) {
      console.log(`Unexpected error : ${err}`);
    }
  } else {
    res.status(403).render("error403");
  }
});

module.exports = router;
