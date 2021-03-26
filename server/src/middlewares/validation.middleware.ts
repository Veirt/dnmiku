import { CreateAccountValidation } from "../schema/validation";
import { Request, Response, NextFunction } from "express";

export const validateCreateAccount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = CreateAccountValidation(req.body);
  if (validationResult === true) return next();
  else res.status(400).json(validationResult);
};
