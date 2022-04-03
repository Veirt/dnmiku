import { Account } from "entities/Account";
import { Controller } from "../../../../@types/controller";

export const isAuthenticated: Controller = (req, res, next) => {
    if (!req.isAuthenticated())
        return res.status(401).json({ message: "Not authenticated" });

    next();
};

export const isAdmin: Controller = (req, res, next) => {
    if (!req.isAuthenticated())
        return res.status(401).json({ message: "Not authenticated" });

    if ((req.user as Account).AccountLevelCode < 99) {
        return res.status(400).json({ message: "Not authorized" });
    }

    return next();
};
