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
