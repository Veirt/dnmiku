"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const body_parser_1 = __importDefault(require("body-parser"));
const router = express_1.default.Router();
const sql = require("mssql");
const db = require("../core/db");
const urlencodedParser = body_parser_1.default.urlencoded({ extended: true });
router.get("/register", (req, res) => {
    let user = req.session.user;
    if (user) {
        res.status(200).redirect("/dashboard");
        return;
    }
    res.status(200).render("register");
});
router.post("/register", urlencodedParser, [
    express_validator_1.check("id")
        .isLength({ min: 6, max: 12 })
        .withMessage("Username must be 6-12 chars")
        .isAlphanumeric()
        .withMessage("Username must not contain special chars")
        .not()
        .isEmpty()
        .withMessage("Username cannot be empty")
        .custom((mentionName) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mentionName.match(/^[0-9a-z]+$/)) {
            throw new Error("Username must not contain special chars");
        }
        const value = yield isMentionNameInUse(mentionName);
        if (value) {
            throw new Error("Username already exists");
        }
    })),
    express_validator_1.check("email")
        .isEmail()
        .withMessage("Email is not valid")
        .not()
        .isEmpty()
        .withMessage("Email cannot be empty")
        .custom((mentionEmail) => __awaiter(void 0, void 0, void 0, function* () {
        const value = yield isMentionEmailInUse(mentionEmail);
        if (value) {
            throw new Error("Email already exists");
        }
    })),
    express_validator_1.check("password")
        .isLength({ min: 6, max: 14 })
        .withMessage("Password must be 6-14 chars")
        .custom((value, { req }) => value === req.body.repeatPassword)
        .withMessage("Passwords do not match")
        .not()
        .isEmpty()
        .withMessage("Password cannot be empty"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        const alert = errors.array();
        for (let i in alert) {
            if (alert[i].param === "id") {
                var idError = alert[i].msg;
            }
            else if (alert[i].param === "password") {
                var passwordError = alert[i].msg;
            }
            else if (alert[i].param === "email") {
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
    }
    else {
        try {
            yield db.poolPromise
                .request()
                .input("id", sql.NVarChar(50), req.body.id)
                .input("password", sql.VarChar(12), req.body.password)
                .input("email", sql.VarChar(50), req.body.email)
                .query("INSERT INTO DNMembership.dbo.Accounts (AccountName, AccountLevelCode, CharacterCreateLimit, CharacterMaxCount, RegisterDate, PublisherCode, Passphrase, mail) VALUES (@id, 99, 4, 8, GETDATE(), 0, CONVERT(BINARY(20),HashBytes('MD5',@password),2), @email)");
            req.session.message = "Registered succesfully";
            res.redirect("/login");
        }
        catch (err) {
            console.log(`Unexpected error : ${err}`);
        }
    }
}));
function isMentionNameInUse(mentionName) {
    return new Promise((resolve, reject) => {
        sql.connect(db.config, (err) => {
            if (err) {
                console.log(`Unexpected error : ${err}`);
                return reject;
            }
            else {
                new sql.Request()
                    .input("id", sql.NVarChar(50), mentionName)
                    .query("SELECT COUNT(AccountName) AS ExistedAccountName FROM DNMembership.dbo.Accounts WHERE AccountName = @id", (err, result) => {
                    if (err) {
                        return reject;
                    }
                    else {
                        return resolve(result.recordset[0].ExistedAccountName > 0);
                    }
                });
            }
        });
    });
}
function isMentionEmailInUse(mentionEmail) {
    return new Promise((resolve, reject) => {
        sql.connect(db.config, (err) => {
            if (err) {
                console.log(`Unexpected error : ${err}`);
                return reject;
            }
            else {
                new sql.Request()
                    .input("email", sql.VarChar(50), mentionEmail)
                    .query("SELECT COUNT(mail) AS ExistedEmail FROM DNMembership.dbo.Accounts WHERE mail = @email", (err, result) => {
                    if (err) {
                        return reject;
                    }
                    else {
                        return resolve(result.recordset[0].ExistedEmail > 0);
                    }
                });
            }
        });
    });
}
module.exports = router;
