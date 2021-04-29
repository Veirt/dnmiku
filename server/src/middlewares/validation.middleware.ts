import { Account } from "../entity/Account";
import { CreateAccountValidation } from "../helpers/validation.helper";
import { Request, Response, NextFunction } from "express";
import { getConnection } from "typeorm";

export const validateCreateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let validationResult: any = CreateAccountValidation(req.body);
  const repository = getConnection().getRepository(Account);

  try {
    await repository.findOneOrFail({
      AccountName: req.body.AccountName,
    });
    if (validationResult !== true) {
      validationResult.push({
        message: "Username already exists",
        field: "AccountName",
      });
    } else {
      validationResult = [
        { message: "Username already exists", field: "AccountName" },
      ];
    }
  } catch (err) {}

  try {
    await repository.findOneOrFail({
      Email: req.body.Email,
    });
    if (validationResult !== true) {
      validationResult.push({
        message: "Email already exists",
        field: "Email",
      });
    } else {
      validationResult = [{ message: "Email already exists", field: "Email" }];
    }
  } catch (err) {}

  if (validationResult === true) return next();
  else res.status(400).json(validationResult);
};
