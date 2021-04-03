import { Account, encryptPassword } from "../entity/Account";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getConnection } from "typeorm";

export const loginAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const accountRepository = getConnection().getRepository(Account);

  const account = await accountRepository.findOne({
    AccountName: req.body.AccountName,
  });

  if (!account) {
    return res
      .status(401)
      .json({ code: 401, message: "Account doesn't exist" });
  }

  if (account.Passphrase !== (await encryptPassword(req.body.Password))) {
    return res.status(401).json({ code: 401, message: "Password incorrect" });
  }

  const payload = {
    name: account.AccountName,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    audience: "mikudn",
    issuer: "exlog",
    expiresIn: "30 days",
    subject: account.AccountName,
  });

  return res
    .cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 1 * 7 * 30 })
    .json({ code: 200, token, account: payload });
};
