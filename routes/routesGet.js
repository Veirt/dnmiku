const express = require('express');
const router = express.Router();
// Database
const db = require('../core/db')
const sql = require('mssql');

router.get('/', (req, res) => {
  (async () => {
    try {
      let pool = await sql.connect(db.config)
      let getOnlinePlayer = await pool.request()
        .query("SELECT COUNT(CertifyingStep) AS OnlinePlayer FROM DNMembership.dbo.DNAuth WHERE CertifyingStep = 2")
      let getTotalAccount = await pool.request().query("SELECT COUNT(AccountID) AS TotalAccount FROM DNMembership.dbo.Accounts")
      let getTotalCharacter = await pool.request().query("SELECT COUNT(CharacterID) AS TotalCharacter FROM DNMembership.dbo.Characters")
      let nowOnline = getOnlinePlayer.recordset[0].OnlinePlayer
      let nowTotalAccount = getTotalAccount.recordset[0].TotalAccount
      let nowTotalCharacter = getTotalCharacter.recordset[0].TotalCharacter

      // Check if the session is exist
      let user = req.session.user
      if (user) {
        res.render('index_dash', {
          opp: req.session.opp,
          "nowOnline": nowOnline,
          "nowTotalAccount": nowTotalAccount,
          "nowTotalCharacter": nowTotalCharacter
        });
        return;
      }
      res.render('index', {
        "nowOnline": nowOnline,
        "nowTotalAccount": nowTotalAccount,
        "nowTotalCharacter": nowTotalCharacter
      });
    } catch (err) {
      console.log(err)
    }
  })()
})

router.get('/register', (req, res) => {
  let user = req.session.user
  if (user) {
    res.redirect('/dashboard')
  } else {
    res.render('register');
  }
})

router.get('/login', (req, res) => {
  let user = req.session.user
  if (user) {
    res.redirect('/dashboard')
  } else {
    let message = req.session.message;
    req.session.message = null;
    res.render('login', {
      message
    });
  }
})

router.get('/launcher', (req, res) => {
  res.render('launcher');
})
router.get('/dashboard', (req, res) => {
  let user = req.session.user;
  if (user) {
    // Refresh session when reload
    (async function () {
      try {
        let pool = await sql.connect(db.config)
        let login = await pool.request()
          .input('id', sql.NVarChar(50), user.AccountName)
          .query('SELECT * FROM DNMembership.dbo.Accounts WHERE AccountName = @id ')

        let getCharList = await pool.request()
          .input('AccountID', sql.Int, user.AccountID)
          .query(`
          SELECT DNMembership.dbo.Characters.CharacterID, DNMembership.dbo.Characters.CharacterName, DNWorld.dbo.Points.Point, DNMembership.dbo.Characters.AccountID, DNWorld.dbo.CharacterStatus.Fatigue FROM DNMembership.dbo.Characters LEFT JOIN DNWorld.dbo.Points ON DNMembership.dbo.Characters.CharacterID = DNWorld.dbo.Points.CharacterID AND DNWorld.dbo.Points.PointCode = 19 LEFT JOIN DNWorld.dbo.CharacterStatus ON DNMembership.dbo.Characters.CharacterID = DNWorld.dbo.CharacterStatus.CharacterID WHERE DNMembership.dbo.Characters.AccountID = @AccountID
          `)
        let chars = getCharList.recordset

        req.session.user = login.recordset[0]
        user = req.session.user
        let gotCash = req.session.cash;
        req.session.cash = null;
        res.render('dashboard', {
          opp: req.session.opp,
          user,
          chars,
          gotCash
        });
      } catch (err) {
        console.log(err)
      }
    })()
  } else {
    res.redirect('/');
  }
})
router.get('/logout', (req, res) => {
  // Check if the session is exist
  if (req.session.user) {
    // destroy the session and redirect the user to the index page.
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/')
  }
});

module.exports = router;