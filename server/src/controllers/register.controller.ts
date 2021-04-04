import { Account } from "../entity/Account";
import { Request, Response } from "express";
import { getConnection } from "typeorm";

export const createAccount = async (req: Request, res: Response) => {
  const accountRepository = getConnection().getRepository(Account);
  try {
    const account = new Account(
      req.body.AccountName,
      req.body.Email,
      0,
      req.body.Password,
      null,
      0,
      1,
      false,
      4,
      8,
      0,
      new Date()
    );
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
