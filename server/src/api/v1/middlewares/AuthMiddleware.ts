import { Controller } from "../../../../@types/controller";

export const isAuthenticated: Controller = (req, res, next) => {
    if (!req.isAuthenticated())
        return res.status(401).json({ message: "Not authenticated" });

    next();
};
