import "../../../config/localStrategy.config"
import { Account } from "../../../entity/DNMembership/Account"
import { NextFunction, Request, Response } from "express"
import { getConnection } from "typeorm"
import passport from "passport"
import jwt from "jsonwebtoken"

export const createAccount = async (req: Request, res: Response) => {
  const accountRepository = getConnection("DNMembership").getRepository(Account)

  const { AccountName, Email, Password } = req.body
  try {
    const account = accountRepository.create({
      AccountName,
      Email,
      AccountLevelCode: 99,
      RLKTPassword: Password,
      LastLoginDate: null,
      SecondAuthFailCount: 0,
      SecondAuthCode: 1,
      SecondAuthLockFlag: false,
      CharacterCreateLimit: 4,
      CharacterMaxCount: 8,
      PublisherCode: 0,
      RegisterDate: new Date(),
      cash: 0,
    })

    await accountRepository.save(account)

    return res
      .status(201)
      .json({ code: 201, message: "Successfully created account" })
  } catch (err) {
    console.error(`Error when register: ${err}`)
    return res
      .status(500)
      .json({ code: 500, message: "Failed creating account" })
  }
}

export const loginAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "local",
    { session: false },
    async (err: Error, account) => {
      try {
        if (err || !account) {
          return res
            .status(401)
            .json({ code: 401, message: "Incorrect username or password" })
        }

        req.login(account, { session: false }, async (err) => {
          if (err) return next(err)

          const payload = {
            name: account.AccountName,
            mail: account.Email,
            role: account.AccountLevelCode,
          }

          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            audience: "mikudn",
            issuer: "exlog",
            expiresIn: "30 days",
            subject: `${account.AccountId}`,
          })

          return res
            .cookie("token", token, {
              maxAge: 1000 * 60 * 60 * 24 * 1 * 7 * 30,
            })
            .json({ code: 200, token, account: payload })
        })
      } catch (err) {
        return next(err)
      }
    }
  )(req, res, next)
}
