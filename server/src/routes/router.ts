import { validateCreateAccount } from "../middlewares/validation.middleware";
import { Account } from "../entity/Account";
import { getConnection } from "typeorm";
import express from "express";
import cors from "cors";

const router = express.Router();

// Router configuration
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// GET
router.get("/", (_, res) => res.json({ message: "pong" }));
router.get("/api/v1/accounts", (req, res) => {});

// POST
router.post("/api/v1/accounts", validateCreateAccount, async (req, res) => {
  const accountRepository = getConnection().getRepository(Account);

  const account = new Account();
  account.AccountName = req.body.AccountName;
  account.Email = req.body.Email;
  account.AccountLevelCode = 0;
  account.RLKTPassword = req.body.Password;
  account.LastLoginDate = null;
  account.SecondAuthFailCount = 0;
  account.SecondAuthCode = 1;
  account.SecondAuthLockFlag = false;
  account.CharacterCreateLimit = 4;
  account.CharacterMaxCount = 8;
  account.PublisherCode = 0;
  account.RegisterDate = new Date();

  await accountRepository.save(account);
  res.json({ message: "Successfully created account" });
});

module.exports = router;
