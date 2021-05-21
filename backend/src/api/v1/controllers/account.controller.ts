import { Account } from "@entity/DNMembership/Account"
import { signToken } from "@api/v1/helpers/jwt.helper"
import { NextFunction, Request, Response } from "express"
import { FindManyOptions, getConnection, ILike } from "typeorm"
import passport from "passport"

export const getAccountData = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	passport.authenticate("jwt", { session: false }, async (err, payload) => {
		if (err) return res.status(401).json({ code: 400, message: err })
		const accountRepository =
			getConnection("DNMembership").getRepository(Account)
		const account = await accountRepository.findOne(payload.sub)

		const token = signToken({ mail: payload.mail, name: payload.name, role: payload.role }, payload.sub)

		return res.status(200).json({ ...account, token })
	})(req, res, next)
}

export const getAccounts = async (req: Request, res: Response): Promise<Response> => {
	const accountRepository = getConnection("DNMembership").getRepository(Account)

	const take = parseInt(req.query.take as string) || 0
	const skip = parseInt(req.query.skip as string) || 0
	const keyword = req.query.keyword || ""
	const status = req.query.status

	const findOptions: FindManyOptions<Account> = {
		take,
		skip,
		relations: ["DNAuth"],
		cache: true,
	}

	try {
		let accounts: Account[]
		if (status === "2") {
			accounts = await accountRepository.find({
				...findOptions,
				join: { alias: "accounts", leftJoin: { DNAuth: "accounts.DNAuth" } },
				where: (qb) => {
					qb.where({
						AccountName: ILike(`%${keyword}%`),
					}).andWhere("DNAuth.CertifyingStep = 2 ")
				},
			})
		} else if (status === "0") {
			accounts = await accountRepository.find({
				...findOptions,
				join: {
					alias: "accounts",
					leftJoin: { DNAuth: "accounts.DNAuth" },
				},
				where: (qb) => {
					qb.where([
						{
							AccountName: ILike(`%${keyword}%`),
						},
					])
						.andWhere("DNAuth.CertifyingStep IS NULL")
						.orWhere("DNAuth.CertifyingStep = 0")
				},
			})
		} else {
			accounts = await accountRepository.find({
				...findOptions,
				where: {
					AccountName: ILike(`%${keyword}%`),
				},
			})
		}

		return res.status(200).json(accounts)
	} catch (err) {
		console.error(`Error when getting accounts: ${err}`)
		return res.status(500).json({
			code: 500,
			message: "Internal server error",
			_links: {
				self: {
					href: `${req.baseUrl}${req.url}`
				},
			},
		})
	}
}

export const getAccountById = async (req: Request, res: Response): Promise<Response> => {
	const accountRepository = getConnection("DNMembership").getRepository(Account)

	try {
		const account = await accountRepository.findOneOrFail(req.params.id)
		return res.status(200).json(account)
	} catch (err) {
		console.error(`Error when getting account by id: ${err}`)
		return res.status(404).json({
			code: 404,
			message: "Resource not found",
			_links: {
				self: { href: `${req.baseUrl}${req.url}`, },
			},
		})
	}
}

export const createAdminAccount = async (req: Request, res: Response): Promise<Response> => {
	const accountRepository = getConnection("DNMembership").getRepository(Account)

	const { AccountName, AccountLevelCode, Email, Password, cash } = req.body
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

export const editAccount = async (req: Request, res: Response): Promise<Response> => {
	const accountRepository = getConnection("DNMembership").getRepository(Account)

	const { AccountName, AccountLevelCode, Email, cash } = req.body

	try {
		await accountRepository.update(req.params.id, {
			AccountName,
			AccountLevelCode,
			Email,
			cash,
		})
		return res
			.status(204)
			.json({ code: 204, message: "Resource updated successfully" })
	} catch (err) {
		console.error(`Error when editing account: ${err}`)
		return res.status(500).json({
			code: 500,
			message: "Internal server error",
			_links: {
				self: { href: `${req.baseUrl}${req.url}`, },
			},
		})
	}
}

export const deleteAccount = async (req: Request, res: Response): Promise<Response> => {
	const accountRepository = getConnection("DNMembership").getRepository(Account)

	try {
		await accountRepository.delete(req.params.id)
		return res
			.status(204)
			.json({ code: 204, message: "Resource deleted successfully" })
	} catch (err) {
		console.error(`Error when deleting account: ${err}`)
		return res.status(500).json({
			code: 500,
			message: "Internal server error",
			_links: {
				self: { href: `${req.baseUrl}${req.url}`, },
			},
		})
	}
}