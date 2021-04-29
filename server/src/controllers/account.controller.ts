import { getAccessToken } from "../helpers/jwt.helper";
import { Account } from "../entity/Account";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import jwt from "jsonwebtoken";

export const getAccountData = async (req: Request, res: Response) => {
  const accessToken = getAccessToken(req.headers.authorization);
  const decoded = jwt.decode(accessToken, {
    json: true,
  });
  const accountRepository = getConnection().getRepository(Account);
  const account = await accountRepository.findOne(
    { AccountId: decoded.id },
    {
      select: [
        "AccountId",
        "AccountName",
        "Email",
        "AccountLevelCode",
        "LastLoginDate",
      ],
    }
  );
  return res.status(200).json({ ...account, accessToken });
};

export const getAccounts = async (req: Request, res: Response) => {
  const accountRepository = getConnection().getRepository(Account);
  try {
    const accounts = await accountRepository.find();
    return res.status(200).json(accounts);
  } catch (err) {
    console.error(`Error when getting accounts: ${err}`);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
      _links: {
        self: { href: req.url },
      },
    });
  }
};
