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
                .query("SELECT COUNT(CertifyingStep) AS OnlinePlayer FROM DNAuth WHERE CertifyingStep = 2")
            let getTotalAccount = await pool.request().query("SELECT COUNT(AccountID) AS TotalAccount FROM Accounts")
            let getTotalCharacter = await pool.request().query("SELECT COUNT(CharacterID) AS TotalCharacter FROM Characters")
            var nowOnline = getOnlinePlayer.recordset[0].OnlinePlayer
            var nowTotalAccount = getTotalAccount.recordset[0].TotalAccount
            var nowTotalCharacter = getTotalCharacter.recordset[0].TotalCharacter

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
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/launcher', (req, res) => {
    res.render('launcher');
})
router.get('/dashboard', (req, res) => {
    let user = req.session.user;
    if (user) {
        res.render('dashboard', {
            opp: req.session.opp,
            user
        });
        return;
    }
    res.redirect('/');
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