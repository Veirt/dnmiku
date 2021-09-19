import { Account } from "@entity/DNMembership/Account";
import { getConnection } from "typeorm";
import passport from "passport";
import discordPassport from "passport-discord";

const DiscordStrategy = discordPassport.Strategy;
const callbackURL =
    process.env.NODE_ENV === "production"
        ? `${process.env.BACKEND_DOMAIN}${process.env.CALLBACK_URL}`
        : process.env.CALLBACK_URL;

passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL,
            scope: ["identify"],
        },
        async (_, __, profile, done) => {
            const accountRepo =
                getConnection("DNMembership").getRepository(Account);

            try {
                const account = await accountRepo.findOneOrFail({
                    DiscordID: profile.id,
                });

                if (account.Avatar !== profile.avatar)
                    await accountRepo.update(
                        { DiscordID: profile.id },
                        { Avatar: profile.avatar }
                    );

                return done(null, account);
            } catch (err) {
                if (err.name === "EntityNotFound")
                    return done(null, false, {
                        DiscordID: profile.id,
                        Avatar: profile.avatar,
                    });
                else return done(err, false);
            }
        }
    )
);
