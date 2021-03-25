import { validateCreateAccount } from "../middlewares/validation.middleware";
import Account from "../sequelize";
import express from "express";
import cors from "cors";

const router = express.Router();

// Router configuration
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// GET
router.get("/", (_, res) => res.json({ message: "pong" }));
router.get("/api/v1/accounts", (req, res) => {
  Account.findAll().then((accounts) => res.json(accounts));
});

// POST
router.post("/api/v1/accounts", validateCreateAccount, (req, res) => {
  const accountData = {
    AccountName: req.body.AccountName,
    Email: req.body.Email,
    AccountLevelCode: 0,
    RLKTPassword: req.body.Password,
    LastLoginDate: null,
    SecondAuthFailCount: 0,
    SecondAuthCode: 1,
    SecondAuthLockFlag: false,
    CharacterCreateLimit: 4,
    CharacterMaxCount: 8,
    PublisherCode: 0,
  };

  Account.create(accountData).then((account) => res.json(account));
});

module.exports = router;
