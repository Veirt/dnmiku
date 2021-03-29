import {Account} from "../entity/Account";
import {Request, Response} from "express"
import {getConnection} from "typeorm";

export const createAccount = async (req: Request, res: Response): Promise<Response> => {
  const accountRepository = getConnection().getRepository(Account);
  try {
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

    return res.status(201).json({ code: 201, message: "Successfully created account" });
  } catch(err) {
    console.error(`Error when register: ${err}`)
    return res.status(500).json({code: 500, message: "Failed creating account"})
  }
}