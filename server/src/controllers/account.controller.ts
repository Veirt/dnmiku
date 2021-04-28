import { Account } from "../entity/Account";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import jwt from "jsonwebtoken";
import { getAuthToken } from "../middlewares/auth.middleware";

export const getAccountData = async (req: Request, res: Response) => {
  const decoded = jwt.decode(getAuthToken(req.headers.authorization), {
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
  return res.status(200).json(account);
};
