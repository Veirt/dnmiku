import { getConnection } from "typeorm";
import { Account } from "../../../entities/Account";

export const getAccountRepository = () => {
    return getConnection("member").getRepository(Account);
};
