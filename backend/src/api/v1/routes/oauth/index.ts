import "@config/discordStrategy.config"
import { Account } from "@entity/DNMembership/Account"
import { signToken } from "@api/v1/helpers/jwt.helper"
import { getConnection } from "typeorm"
import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"

const router = express.Router()

router.get("/discord", passport.authenticate("discord", { session: false }))

router.get("/discord/callback", (req, res) => {
	passport.authenticate(
		"discord",
		{ session: false, failureRedirect: "/" },
		async (err: Error | null, account, info: { DiscordID: string }) => {
			const accountRepository =
				getConnection("DNMembership").getRepository(Account)
			if (info?.DiscordID) {
				// Forgive me, my future self
				const accessToken = req.headers.cookie.split("token=")[1]

				const AccountId = jwt.decode(accessToken, { json: true }).sub

				try {
					await accountRepository.update(
						{ AccountId },
						{ DiscordID: info.DiscordID }
					)
					return res.redirect("http://localhost:3000/profile")
				} catch (err) {
					console.error(`Error when updating DiscordID OAuth: ${err}`)
					return res
						.status(500)
						.json({ code: 500, message: "Internal server error" })
				}
			} else if (err) {
				return res.status(500).redirect("http://localhost:3000/login?e=discord")
			} else {
				const payload = {
					name: account.AccountName,
					mail: account.Email,
					role: account.AccountLevelCode,
				}

				const token = signToken(payload, `${account.AccountId}`)

				return res
					.cookie("token", token)
					.redirect("http://localhost:3000/profile")
			}
		}
	)(req, res)
})

export default router