import { getAccessToken } from "../helpers/jwt.helper";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = getAccessToken(req.headers.authorization);
  jwt.verify(
    accessToken,
    process.env.JWT_SECRET,
    {
      audience: "mikudn",
      issuer: "exlog",
    },
    (err) => {
      if (!err) {
        return next();
      }

      return res.status(401).json({ code: 401, message: "Not authenticated" });
    }
  );
};
