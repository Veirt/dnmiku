import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type authToken = string;

export const getAuthToken = (authorization: string): authToken => {
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    return authorization.split(" ")[1];
  } else {
    return null;
  }
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = getAuthToken(req.headers.authorization);
  jwt.verify(
    authToken,
    process.env.JWT_SECRET,
    {
      audience: "mikudn",
      issuer: "exlog",
    },
    (err) => {
      if (!err) {
        return next();
      }

      return res.status(401).json({ code: 401, message: "Invalid token" });
    }
  );
};
