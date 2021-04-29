import { Account } from "../entity/Account";
import { getConnection } from "typeorm";

export const checkIfAdmin = async (AccountId: number) => {
  const accountRepository = getConnection().getRepository(Account);

  const account = await accountRepository.findOneOrFail(
    { AccountId },
    { select: ["AccountId", "AccountLevelCode"] }
  );

  return account.AccountLevelCode === 99;
};
