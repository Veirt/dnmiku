import passport from "passport";
import { DeepPartial } from "typeorm";
import { Controller } from "../../../../@types/controller";
import { Account } from "../../../entities/Account";
import { getAccountRepository } from "../utils/repository";

export const localAuth: Controller = (req, res, next) => {
    passport.authenticate("local", (err, account) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        req.logIn(account, (err) => {
            if (err) return res.json({ message: err.message });

            return res.json(account);
        });
    })(req, res, next);
};

export const registerAccount: Controller = async (req, res) => {
    // TODO: validation account name and passphrase
    // TODO: validation check whether account name is used or not
    const { AccountName, Passphrase } = req.body;

    const accountRepo = getAccountRepository();

    const data: DeepPartial<Account> = {
        AccountName,
        Passphrase,
        AccountLevelCode: 1,
    };
    const newAccount = accountRepo.create(data);
    await accountRepo.save(newAccount);

    return res.status(204).json();
};
