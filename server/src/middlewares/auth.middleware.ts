import { getAccessToken } from "../helpers/jwt.helper";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { checkIfAdmin } from "../helpers/auth.helper";

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

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = getAccessToken(req.headers.authorization);
  jwt.verify(
    accessToken,
    process.env.JWT_SECRET,
    {
      audience: "mikudn",
      issuer: "exlog",
    },
    async (err, decoded: { id: number }) => {
      if (!err) {
        if (await checkIfAdmin(decoded.id)) return next();
        else return res.status(401).json({ code: 401, message: "Not admin" });
      }

      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ code: 401, message: "Not Authenticated" });
      } else if (err.name === "JSONWebTokenError") {
        return res.status(401).json({ code: 401, message: "Invalid token" });
      } else {
        console.error(`Error when checking if admin ${err}`);
        return res
          .status(500)
          .json({ code: 500, message: "Internal server error" });
      }
    }
  );
};
