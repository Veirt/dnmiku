import { checkIfAdmin } from "@api/v1/helpers/auth.helper"
import { Request, Response, NextFunction } from "express"
import passport from "passport"

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	passport.authenticate("jwt", { session: false })(req, res, next)
}

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
	passport.authenticate("jwt", { session: false }, async (err, payload) => {
		if (err || !payload) {
			return res.status(401).json({ code: 401, message: "Unauthorized" })
		}

		if (await checkIfAdmin(payload.sub)) return next()
		else return res.status(401).json({ code: 401, message: "Not admin" })
	})(req, res, next)
}
