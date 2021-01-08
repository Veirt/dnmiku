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
const body_parser_1 = __importDefault(require("body-parser"));
const express_validator_1 = require("express-validator");
const mssql_1 = __importDefault(require("mssql"));
const db = require("../core/db");
const urlencodedParser = body_parser_1.default.urlencoded({ extended: true });
const router = express_1.default.Router();
router.get("/login", (req, res) => {
    var _a, _b;
    let user = req.session.user;
    if (user) {
        res.status(200).redirect("/dashboard");
        return;
    }
    let id = req.session.loginId;
    let error = {
        idError: (_a = req.session.error) === null || _a === void 0 ? void 0 : _a.idError,
        passwordError: (_b = req.session.error) === null || _b === void 0 ? void 0 : _b.passwordError,
    };
    let message = req.session.message;
    req.session.loginId = null;
    req.session.message = null;
    req.session.error = null;
    res.status(200).render("login", {
        message,
        error,
        id,
    });
});
router.post("/login", urlencodedParser, [
    express_validator_1.check("id")
        .isAlphanumeric()
        .withMessage("Username must not contain special chars")
        .not()
        .isEmpty()
        .withMessage("Username cannot be empty"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        const alert = errors.array();
        for (let i in alert) {
            if (alert[i].param === "id") {
                var idError = alert[i].msg;
            }
        }
        req.session.error = { idError };
        req.session.loginId = req.body.id;
        res.status(400).redirect("/login");
        return;
    }
    try {
        if (!req.body.id.match(/^[0-9a-z]+$/)) {
            let idError = "Username must not contain special chars";
            req.session.error = { idError };
            req.session.loginId = req.body.id;
            res.status(400).redirect("/login");
            return;
        }
        let login = yield db.poolPromise
            .request()
            .input("id", mssql_1.default.NVarChar(50), req.body.id)
            .query("SELECT * FROM DNMembership.dbo.Accounts WHERE AccountName = @id ");
        let getEncryptedPassword = yield db.poolPromise
            .request()
            .input("vchPassphrase", mssql_1.default.VarChar(12), req.body.password)
            .execute("DNMembership.dbo.EncryptPassword");
        const EncryptedPassword = getEncryptedPassword.recordset[0].EncryptedPassword;
        if (login.rowsAffected[0] < 1) {
            let idError = "Username doesn't exist";
            req.session.error = { idError };
            req.session.loginId = req.body.id;
            res.status(400).redirect("/login");
            return;
        }
        if (Buffer.compare(EncryptedPassword, login.recordset[0].Passphrase) === 0) {
            req.session.user = login.recordset[0];
            req.session.opp = 1;
            res.status(200).redirect("/dashboard");
            return;
        }
        let passwordError = "Password is incorrect";
        req.session.error = { passwordError };
        req.session.loginId = req.body.id;
        res.status(400).redirect("/login");
        return;
    }
    catch (err) {
        console.log(`Unexpected error : ${err}`);
    }
}));
module.exports = router;
