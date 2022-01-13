import passport from "passport";
import { Controller } from "../../../../@types/controller";

export const localAuth: Controller = (req, res, next) => {
    passport.authenticate("local", { session: true }, (err, account) => {
        if (err) {
            return res.json({ message: err.message });
        }

        res.json(account);
    })(req, res, next);
};
