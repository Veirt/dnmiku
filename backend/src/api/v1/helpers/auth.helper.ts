import { Account } from "@entity/DNMembership/Account"
import { getConnection } from "typeorm"

export const checkIfAdmin = async (AccountId: number) => {
  const accountRepository = getConnection("DNMembership").getRepository(Account)

  const account = await accountRepository.findOneOrFail(
    { AccountId },
    { select: ["AccountId", "AccountLevelCode"] }
  )

  return account.AccountLevelCode >= 99
}
