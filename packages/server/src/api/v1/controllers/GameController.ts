import type { Controller } from "../../../../@types/controller";
import { getAccountRepository } from "../utils/repository";

export const loginInGame: Controller = async (req, res) => {
    const { id: AccountName, password: Passphrase } = req.body;
    try {
        const account = await getAccountRepository().findOneOrFail(
            {
                AccountName,
            },
            { select: ["NxLoginPwd"] }
        );

        if (account.NxLoginPwd !== (Passphrase as string).toUpperCase()) {
            // E203: Incorrect Password
            return res.send("E203");
        }

        // S000: success
        return res.send("S000	OK	0");
    } catch (err) {
        // E202: Account doesn't exist
        return res.send("E202");
    }
};

const makeResponse = (status: string, accountName: string, balance: number) => {
    const response = {
        SID: "DRNEST",
        CN: "44820790",
        UID: accountName,
        "RESULT-CODE": status,
        "RESULT-MESSAGE": "Success",
        "CASH-BALANCE": balance,
    };

    return response;
};

export const balanceInGame: Controller = async (req, res) => {
    const { UID: AccountName } = req.body;

    try {
        const account = await getAccountRepository().findOneOrFail(
            { AccountName },
            { select: ["Cash"] }
        );

        return res.send(makeResponse("S000", AccountName, account.Cash));
    } catch (err) {
        console.error(`Error when getting balance in game: ${err}`);
        return res.status(500).json({ message: "Unexpected error." });
    }
};

export const payInGame: Controller = async (req, res) => {
    const { "BUYER-ID": AccountName, "TOTAL-PRICE": price } = req.body;

    try {
        const account = await getAccountRepository().findOneOrFail(
            { AccountName },
            { select: ["Cash"] }
        );

        if (account.Cash < price) {
            throw Error("Not enough cash.");
        }

        await getAccountRepository().update(account, {
            Cash: account.Cash - price,
        });

        return res.send(makeResponse("S000", AccountName, account.Cash));
    } catch (err) {
        console.error(`Error when paying in game: ${err}`);
        return res.status(500).json({ message: "Unexpected error." });
    }
};
