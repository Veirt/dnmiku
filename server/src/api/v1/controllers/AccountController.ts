import { DeepPartial, getConnection } from "typeorm";
import { Controller } from "../../../../@types/controller";
import { Account } from "../../../entities/Account";

const accountRepository = getConnection("member").getRepository(Account);

export const getAccounts: Controller = async (_req, res) => {
    const accounts = await accountRepository.find();

    return res.json(accounts);
};

export const getAccountById: Controller = async (req, res) => {
    // TODO: better error handling
    try {
        const account = await accountRepository.findOneOrFail(req.params.id);
        return res.json(account);
    } catch (err) {
        return res.json({ message: "not found ig" });
    }
};

export const createAccount: Controller = async (req, res) => {
    // TODO: validation & error handling
    const data: DeepPartial<Account> = {
        AccountName: req.body.AccountName,
        AccountLevelCode: req.body.AccountLevelCode,
        Passphrase: req.body.Passphrase,
        cash: req.body.cash,
    };

    const newAccount = accountRepository.create(data);

    const account = await accountRepository.save(newAccount);

    return res.json(account);
};
