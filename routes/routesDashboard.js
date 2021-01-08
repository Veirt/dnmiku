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
const mssql_1 = __importDefault(require("mssql"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const router = express_1.default.Router();
const db = require("../core/db");
const urlencodedParser = body_parser_1.default.urlencoded({ extended: true });
node_schedule_1.default.scheduleJob("@daily", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.poolPromise
            .request()
            .query("UPDATE DNMembership.dbo.Accounts SET claimDaily = 0");
        console.log("Daily has been resetted");
    }
    catch (err) {
        console.log(`Unexpected error : ${err}`);
    }
}));
router.get("/dashboard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.session.user;
    if (user) {
        try {
            let login = yield db.poolPromise
                .request()
                .input("id", mssql_1.default.NVarChar(50), user.AccountName)
                .query("SELECT AccountID, AccountName, LastLoginDate, LastLogoutDate, RegisterDate, mail, cash, claimDaily FROM DNMembership.dbo.Accounts WHERE AccountName = @id ");
            let getCharList = yield db.poolPromise
                .request()
                .input("intAccountID", mssql_1.default.Int, user.AccountID)
                .execute("DNMembership.dbo.checkCashPoint");
            let chars = getCharList.recordset;
            req.session.user = login.recordset[0];
            user = req.session.user;
            let gotCash = req.session.cash;
            req.session.cash = null;
            res.status(200).render("dashboard", {
                opp: req.session.opp,
                user,
                chars,
                gotCash,
            });
        }
        catch (err) {
            console.log(`Unexpected error : ${err}`);
        }
    }
    else {
        res.status(403).render("error403");
    }
}));
router.post("/dashboard/api/cash", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.session.user;
    if (user) {
        let randomAmountCash = Math.floor(Math.random() * 10000);
        if (user.claimDaily === 1) {
            res.status(403).redirect("/");
        }
        else {
            try {
                yield db.poolPromise
                    .request()
                    .input("id", mssql_1.default.NVarChar(50), user.AccountName)
                    .input("randomAmountCash", mssql_1.default.Int, randomAmountCash)
                    .query("UPDATE DNMembership.dbo.Accounts SET cash = cash + @randomAmountCash, claimDaily = 1 WHERE AccountName = @id");
                let login = yield db.poolPromise
                    .request()
                    .input("id", mssql_1.default.NVarChar(50), user.AccountName)
                    .query("SELECT AccountID, AccountName, LastLoginDate, LastLogoutDate, RegisterDate, mail, cash, claimDaily FROM DNMembership.dbo.Accounts WHERE AccountName = @id ");
                req.session.user = login.recordset[0];
                user = req.session.user;
                req.session.cash = randomAmountCash;
                res.redirect("/dashboard");
            }
            catch (err) {
                console.log(`Unexpected error : ${err}`);
            }
        }
    }
    else {
        res.status(403).render("error403");
    }
}));
router.post("/dashboard/api/ftg", urlencodedParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.session.user;
    if (user) {
        try {
            yield db.poolPromise
                .request()
                .input("CharacterID", mssql_1.default.BigInt, parseInt(req.body.CharacterID))
                .query("UPDATE DNWorld.dbo.CharacterStatus SET Fatigue = Fatigue+5000 WHERE CharacterID = @CharacterID");
            yield db.poolPromise
                .request()
                .input("CharacterID", mssql_1.default.BigInt, parseInt(req.body.CharacterID))
                .query("UPDATE DNWorld.dbo.Points SET Point = Point-1000 WHERE CharacterID = @CharacterID AND PointCode = 19");
            res.redirect("/dashboard");
        }
        catch (err) {
            console.log(`Unexpected error : ${err}`);
        }
    }
    else {
        res.status(403).render("error403");
    }
}));
module.exports = router;
