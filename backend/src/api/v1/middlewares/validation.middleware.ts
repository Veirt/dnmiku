import { Account } from "@entity/DNMembership/Account"
import { CreateAccountValidation } from "@api/v1/helpers/validation.helper"
import { Request, Response, NextFunction } from "express"
import { getConnection } from "typeorm"

export const validateCreateAccount = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let validationResult: any = CreateAccountValidation(req.body)

	const accountRepository = getConnection("DNMembership").getRepository(Account)

	try {
		await accountRepository.findOneOrFail({
			AccountName: req.body.AccountName,
		})
		if (validationResult !== true) {
			validationResult.push({
				message: "Username already exists",
				field: "AccountName",
			})
		} else {
			validationResult = [
				{ message: "Username already exists", field: "AccountName" },
			]
		}
	} catch (err) {
		console.error(`Error when validating account name: ${err}`)
		return res.status(500).json({
			code: 500, message: "Internal server error",
			_links: {
				self: { href: req.baseUrl },
			},
		})
	}

	try {
		await accountRepository.findOneOrFail({
			Email: req.body.Email,
		})
		if (validationResult !== true) {
			validationResult.push({
				message: "Email already exists",
				field: "Email",
			})
		} else {
			validationResult = [{ message: "Email already exists", field: "Email" }]
		}
	} catch (err) {
		console.error(`Error when validating email: ${err}`)
		return res.status(500).json({
			code: 500, message: "Internal server error",
			_links: {
				self: { href: req.baseUrl },
			},
		})

	}

	if (validationResult === true) return next()
	else res.status(400).json(validationResult)
}
