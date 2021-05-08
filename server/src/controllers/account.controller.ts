import { getAccessToken } from "../helpers/jwt.helper";
import { Account } from "../entity/DNMembership/Account";
import { Request, Response } from "express";
import { getConnection, ILike } from "typeorm";
import jwt from "jsonwebtoken";

export const getAccountData = async (req: Request, res: Response) => {
  const accessToken = getAccessToken(req.headers.authorization);
  const decoded = jwt.decode(accessToken, {
    json: true,
  });
  const accountRepository = getConnection("DNMembership").getRepository(
    Account
  );
  const account = await accountRepository.findOne({ AccountId: decoded.id });
  return res.status(200).json({ ...account, accessToken });
};

export const getAccounts = async (req: Request, res: Response) => {
  const accountRepository = getConnection("DNMembership").getRepository(
    Account
  );

  const take = parseInt(req.query.take as string) || 0;
  const skip = parseInt(req.query.skip as string) || 0;
  const keyword = req.query.keyword || "";

  try {
    const accounts = await accountRepository.find({
      take,
      skip,
      where: { AccountName: ILike(`%${keyword}%`) },
      cache: true,
      relations: ["DNAuth"],
    });
    return res.status(200).json(accounts);
  } catch (err) {
    console.error(`Error when getting accounts: ${err}`);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
      _links: {
        self: { href: req.url },
      },
    });
  }
};

export const getAccountById = async (req: Request, res: Response) => {
  const accountRepository = getConnection("DNMembership").getRepository(
    Account
  );

  try {
    const account = await accountRepository.findOneOrFail(req.params.id);
    return res.status(200).json(account);
  } catch (err) {
    console.error(`Error when getting account by id: ${err}`);
    res.status(404).json({
      code: 404,
      message: "Resource not found",
      _links: {
        self: { href: req.url },
      },
    });
  }
};

export const createAdminAccount = async (req: Request, res: Response) => {
  const accountRepository = getConnection("DNMembership").getRepository(
    Account
  );

  const { AccountName, AccountLevelCode, Email, Password, cash } = req.body;
  try {
    const account = accountRepository.create({
      AccountName,
      Email,
      AccountLevelCode,
      cash,
      RLKTPassword: Password,
      LastLoginDate: null,
      SecondAuthFailCount: 0,
      SecondAuthCode: 1,
      SecondAuthLockFlag: false,
      CharacterCreateLimit: 4,
      CharacterMaxCount: 8,
      PublisherCode: 0,
      RegisterDate: new Date(),
    });

    await accountRepository.save(account);

    return res
      .status(201)
      .json({ code: 201, message: "Successfully created account" });
  } catch (err) {
    console.error(`Error when register: ${err}`);
    return res
      .status(500)
      .json({ code: 500, message: "Failed creating account" });
  }
};

export const editAccount = async (req: Request, res: Response) => {
  const accountRepository = getConnection("DNMembership").getRepository(
    Account
  );

  const { AccountName, AccountLevelCode, Email, cash } = req.body;

  try {
    await accountRepository.update(req.params.id, {
      AccountName,
      AccountLevelCode,
      Email,
      cash,
    });
    return res
      .status(204)
      .json({ code: 204, message: "Resource updated successfully" });
  } catch (err) {
    console.error(`Error when editing account: ${err}`);
    res.status(500).json({
      code: 500,
      message: "Internal server error",
      _links: {
        self: { href: req.url },
      },
    });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  const accountRepository = getConnection("DNMembership").getRepository(
    Account
  );

  try {
    await accountRepository.delete(req.params.id);
    return res
      .status(204)
      .json({ code: 204, message: "Resource deleted successfully" });
  } catch (err) {
    console.error(`Error when deleting account: ${err}`);
    res.status(500).json({
      code: 500,
      message: "Internal server error",
      _links: {
        self: { href: req.url },
      },
    });
  }
};
