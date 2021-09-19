import passport from "passport";
import passportJwt from "passport-jwt";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts: passportJwt.StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: "exlog",
    audience: "mikudn",
};

passport.use(
    new JwtStrategy(opts, async (payload, done) => {
        try {
            return done(null, payload);
        } catch (err) {
            done(err);
        }
    })
);
