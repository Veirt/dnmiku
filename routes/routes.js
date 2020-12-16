const express = require('express');
const router = express.Router();
const db = require('../core/db')
const sql = require('mssql');

const bodyParser = require('body-parser');
const {
    check,
    validationResult,
    cookie,
} = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

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
router.get('/dashboard', (req, res) => {
    let user = req.session.user;
    if (user) {
        res.render('dashboard', {
            opp: req.session.opp
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
    .isLength({
        min: 6,
        max: 12
    }).withMessage("Username must be 6-12 chars")
    .not().isEmpty().withMessage("Username cannot be empty"),

    check('password')
    .isLength({
        min: 6,
        max: 14
    }).withMessage("Password must be 6-14 chars")
], (req, res) => {
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
})

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