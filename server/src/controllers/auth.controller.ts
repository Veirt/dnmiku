import { Account, encryptPassword } from "../entity/Account";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getConnection } from "typeorm";

export const createAccount = async (req: Request, res: Response) => {
  const accountRepository = getConnection().getRepository(Account);

  const { AccountName, Email, Password } = req.body;
  try {
    const account = accountRepository.create({
      AccountName,
      Email,
      AccountLevelCode: 0,
      RLKTPassword: Password,
      LastLoginDate: null,
      SecondAuthFailCount: 0,
      SecondAuthCode: 1,
      SecondAuthLockFlag: false,
      CharacterCreateLimit: 4,
      CharacterMaxCount: 8,
      PublisherCode: 0,
      RegisterDate: new Date(),
      cash: 0,
    });

    await accountRepository.save(account);

    return res
      .status(201)
      .json({ code: 201, message: "Successfully created account" });
  } catch (err) {
    console.error(`Error when register: ${err}`);
    return res
      .status(500)
      .json({ code: 500, message: "Failed creating account" });
  }
};

export const loginAccount = async (req: Request, res: Response) => {
  const accountRepository = getConnection().getRepository(Account);

  const account = await accountRepository.findOne(
    {
      AccountName: req.body.AccountName,
    },
    {
      select: [
        "Passphrase",
        "AccountId",
        "AccountName",
        "Email",
        "AccountLevelCode",
      ],
    }
  );

  if (!account) {
    return res
      .status(401)
      .json({ code: 401, message: "Account doesn't exist" });
  }

  if (account.Passphrase !== (await encryptPassword(req.body.Password))) {
    return res.status(401).json({ code: 401, message: "Password incorrect" });
  }

  const payload = {
    id: account.AccountId,
    mail: account.Email,
    role: account.AccountLevelCode,
  };

  const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
    audience: "mikudn",
    issuer: "exlog",
    expiresIn: "30 days",
    subject: account.AccountName,
  });

  return res
    .cookie("token", authToken, { maxAge: 1000 * 60 * 60 * 24 * 1 * 7 * 30 })
    .json({ code: 200, authToken, account: payload });
};
