const express = require('express');
// Database
const db = require('../core/db')
const sql = require('mssql');
// Body parser and validator
const bodyParser = require('body-parser');
const {
    check,
    validationResult,
    cookie
} = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

const router = express.Router();

// Register Validation
router.post('/register', urlencodedParser, [
    // ID Validation 
    check('id')
    .isLength({
        min: 6,
        max: 12
    }).withMessage("Username must be 6-12 chars")
    .isAlphanumeric().withMessage("Username must not contain special chars")
    .not().isEmpty().withMessage("Username cannot be empty")
    .custom(async mentionName => {
        const value = await isMentionNameInUse(mentionName);
        if (value) {
            throw new Error('Username already exists');
        }
    }),
    // Email validation 
    check('email')
    .isEmail().withMessage("Email is not valid")
    .not().isEmpty().withMessage("Email cannot be empty")
    .custom(async mentionEmail => {
        const value = await isMentionEmailInUse(mentionEmail);
        if (value) {
            throw new Error('Email already exists');
        }
    }),
    // Password Validation 
    check('password')
    .isLength({
        min: 6,
        max: 14
    }).withMessage("Password must be 6-14 chars")
    .custom((value, {
        req
    }) => value === req.body.repeatPassword).withMessage("Passwords do not match")
    .not().isEmpty().withMessage("Password cannot be empty"),
], (req, res) => {
    const errors = validationResult(req)
    // If Error IS NOT Empty
    if (!errors.isEmpty()) {
        const alert = errors.array()
        for (i in alert) {
            if (alert[i].param === "id") {
                var idError = alert[i].msg
            } else if (alert[i].param === "password") {
                var passwordError = alert[i].msg
            } else if (alert[i].param === "email") {
                var emailError = alert[i].msg
            }
        }
        res.status(400).render("register", {
            "idError": idError,
            "emailError": emailError,
            "passwordError": passwordError,
            "id": req.body.id,
            "email": req.body.email
        })
    } else {
        (async () => {
            try {
                let pool = await sql.connect(db.config)
                let registerQuery = await pool.request()
                    .input("id", sql.NVarChar(50), req.body.id)
                    .input("password", sql.VarChar(12), req.body.password)
                    .input("email", sql.VarChar(50), req.body.email)
                    .query("INSERT INTO dbo.Accounts (AccountName, AccountLevelCode, CharacterCreateLimit, CharacterMaxCount, RegisterDate, PublisherCode, Passphrase, mail) VALUES (@id, 99, 4, 8, GETDATE(), 0, CONVERT(BINARY(20),HashBytes('MD5',@password),2), @email)")

                res.render('login', {
                    "message": "Register Success"
                })
            } catch (err) {
                console.log(err)
            }
        })()
    }


})

router.post('/login', urlencodedParser, [
    check('id')
    .isAlphanumeric().withMessage("Username must not contain special chars")
    .not().isEmpty().withMessage("Username cannot be empty")
], (req, res) => {
    const errors = validationResult(req)
    // If Error IS NOT Empty
    if (!errors.isEmpty()) {
        const alert = errors.array()
        for (i in alert) {
            if (alert[i].param === "id") {
                var idError = alert[i].msg
            }
        }
        res.status(400).render("login", {
            "idError": idError,
            "id": req.body.id
        })
    } else {
        (async function () {
            try {
                let pool = await sql.connect(db.config)
                let login = await pool.request()
                    .input('id', sql.NVarChar(50), req.body.id)
                    .query('SELECT * FROM Accounts WHERE AccountName = @id ')

                let getEncryptedPassword = await pool.request()
                    .input('vchPassphrase', sql.VarChar(12), req.body.password)
                    .execute('EncryptPassword')
                const EncryptedPassword = getEncryptedPassword.recordset[0].EncryptedPassword
                if (login.rowsAffected[0] < 1) {
                    res.status(401).render('login', {
                        "idError": "Username doesn't exist",
                        "id": req.body.id
                    })
                } else {
                    if (Buffer.compare(EncryptedPassword, login.recordset[0].Passphrase) === 0) {
                        const id = login.recordset[0].AccountName
                        // Store the user data in a session.
                        req.session.user = login.recordset[0];
                        req.session.opp = 1;
                        res.status(200).redirect("/dashboard")

                        // If password is incorrect
                    } else {
                        res.status(401).render('login', {
                            "passwordError": "Password is incorrect",
                            "id": req.body.id
                        })
                    }
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }

})

router.post('/dashboard', (req, res) => {
    let user = req.session.user
    let cash = user.cash
    // Random amount cash 0-10000
    let randomAmountCash = Math.floor(Math.random() * 10000);
    if (user.claimDaily === 1) {
        res.send("Fuck you")
    } else {
        (async function () {
            try {
                let pool = await sql.connect(db.config)
                let claimCash = await pool.request()
                    .input('id', sql.NVarChar(50), user.AccountName)
                    .input('randomAmountCash', sql.Int, cash + randomAmountCash)
                    .query('UPDATE Accounts SET cash = @randomAmountCash, claimDaily = 1 WHERE AccountName = @id')

                let login = await pool.request()
                    .input('id', sql.NVarChar(50), user.AccountName)
                    .query('SELECT * FROM Accounts WHERE AccountName = @id ')
                req.session.user = login.recordset[0]
                user = req.session.user
                res.render('dashboard', {
                    gotCash: randomAmountCash,
                    user
                })
            } catch (err) {
                console.log(err)
            }
        })()
    }
})
// Daily
const schedule = require('node-schedule');
var resetDaily = schedule.scheduleJob('@daily', () => {
    (async function () {
        try {
            let pool = await sql.connect(db.config)
            let resetDaily = await pool.request()
                .query("UPDATE Accounts SET claimDaily = 0")
            console.log("Daily has been resetted")
        } catch (err) {
            console.log(err)
        }
    })()
});

function isMentionNameInUse(mentionName) {
    return new Promise((resolve, reject) => {
        sql.connect(db.config, err => {
            new sql.Request()
                .input('id', sql.NVarChar(50), mentionName)
                .query('SELECT COUNT(AccountName) AS ExistedAccountName FROM Accounts WHERE AccountName = @id', (err, result) => {
                    if (err) {
                        return reject
                    } else {
                        return resolve(result.recordset[0].ExistedAccountName > 0)
                    }
                })
        })
    });
}

function isMentionEmailInUse(mentionEmail) {
    return new Promise((resolve, reject) => {
        sql.connect(db.config, err => {
            new sql.Request()
                .input('email', sql.VarChar(50), mentionEmail)
                .query('SELECT COUNT(mail) AS ExistedEmail FROM Accounts WHERE mail = @email', (err, result) => {
                    // ... error checks
                    if (err) {
                        return reject
                    } else {
                        return resolve(result.recordset[0].ExistedEmail > 0)
                    }
                })
        })
    });
}

module.exports = router;