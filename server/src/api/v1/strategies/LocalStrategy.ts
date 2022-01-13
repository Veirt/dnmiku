import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getConnection } from "typeorm";
import { Account } from "../../../entities/Account";

const accountRepo = getConnection("member").getRepository(Account);

passport.use(
    new LocalStrategy(
        { usernameField: "AccountName", passwordField: "Passphrase" },
        async (accountName, passphrase, done) => {
            try {
                const account = await accountRepo.findOneOrFail({
                    AccountName: accountName,
                });

                if (!(await account.comparePassword(passphrase))) {
                    console.log(await account.comparePassword(passphrase));
                    throw new Error("Password incorrect");
                }

                return done(null, account);
            } catch (err) {
                //TODO: handle error. probably not found
                return done(err);
            }
        }
    )
);

passport.serializeUser((account, done) => {
    return done(null, (account as Account).AccountID);
});

passport.deserializeUser(async (accountId, done) => {
    try {
        const account = await accountRepo.findOneOrFail(accountId as number);
        return done(null, account);
    } catch (err) {
        return done(err);
    }
});
