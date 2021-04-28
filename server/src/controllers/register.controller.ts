import { Account } from "../entity/Account";
import { Request, Response } from "express";
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
