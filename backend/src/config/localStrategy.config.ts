import { Account, encryptPassword } from "@entity/DNMembership/Account";
import { getConnection } from "typeorm";
import passport from "passport";
import localPassport from "passport-local";

const localStrategy = localPassport.Strategy;

passport.use(
    "local",
    new localStrategy(
        {
            usernameField: "AccountName",
            passwordField: "Password",
        },
        async (AccountName, Password, done) => {
            try {
                const accountRepo =
                    getConnection("DNMembership").getRepository(Account);
                const account = await accountRepo.findOne(
                    { AccountName },
                    {
                        select: [
                            "Passphrase",
                            "AccountId",
                            "AccountName",
                            "Email",
                            "AccountLevelCode",
                        ],
                    }
                );

                if (!account) {
                    return done(null, false, { message: "Account not found" });
                }

                if (account.Passphrase !== (await encryptPassword(Password))) {
                    return done(null, false, { message: "Wrong Password" });
                }

                return done(null, account, {
                    message: "Logged in Successfully",
                });
            } catch (err) {
                return done(err);
            }
        }
    )
);
