import { Account } from "@entity/DNMembership/Account"
import { getConnection } from "typeorm"
import passport from "passport"
import discordPassport from "passport-discord"

const DiscordStrategy = discordPassport.Strategy

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ["identify", "guilds"],
    },
    async (_, __, profile, done) => {
      const accountRepository =
        getConnection("DNMembership").getRepository(Account)

      try {
        const account = await accountRepository.findOneOrFail({
          DiscordID: profile.id,
        })

        return done(null, account)
      } catch (err) {
        if (err.name === "EntityNotFoundError")
          return done(null, false, { DiscordID: profile.id })
        else return done(err, false)
      }
    }
  )
)
