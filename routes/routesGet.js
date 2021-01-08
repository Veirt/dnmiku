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
const router = express_1.default.Router();
const db = require("../core/db");
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let getOnlinePlayer = yield db.poolPromise
            .request()
            .query("SELECT COUNT(CertifyingStep) AS OnlinePlayer FROM DNMembership.dbo.DNAuth WHERE CertifyingStep = 2");
        let getTotalAccount = yield db.poolPromise
            .request()
            .query("SELECT COUNT(AccountID) AS TotalAccount FROM DNMembership.dbo.Accounts");
        let getTotalCharacter = yield db.poolPromise
            .request()
            .query("SELECT COUNT(CharacterID) AS TotalCharacter FROM DNMembership.dbo.Characters");
        let nowOnline = getOnlinePlayer.recordset[0].OnlinePlayer;
        let nowTotalAccount = getTotalAccount.recordset[0].TotalAccount;
        let nowTotalCharacter = getTotalCharacter.recordset[0].TotalCharacter;
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
    }
    catch (err) {
        console.log(`Unexpected error : ${err}`);
    }
}));
router.get("/download", (req, res) => {
    res.status(200).render("download");
});
router.get("/launcher", (req, res) => {
    res.status(200).render("launcher");
});
router.get("/logout", (req, res) => {
    if (req.session.user) {
        req.session.destroy(() => {
            res.redirect("/");
        });
    }
    else {
        res.redirect("/");
    }
});
module.exports = router;
