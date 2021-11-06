import { Account } from "@entity/DNMembership/Account";
import { getConnection } from "typeorm";

export const checkIfAdmin = async function (
    AccountId: number
): Promise<boolean> {
    const accountRepo = getConnection("DNMembership").getRepository(Account);

    const account = await accountRepo.findOneOrFail(
        { AccountId },
        { select: ["AccountId", "AccountLevelCode"] }
    );

    return account.AccountLevelCode >= 99;
};
