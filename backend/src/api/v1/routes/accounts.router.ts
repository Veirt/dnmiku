import * as accountControllers from "@api/v1/controllers/account.controller"
import { createAccount } from "@api/v1/controllers/auth.controller"
import { validateCreateAccount } from "@api/v1/middlewares/validation.middleware"
import { isAuthenticated, isAdmin, } from "@api/v1/middlewares/auth.middleware"
import { Router } from "express"

const router = Router()

router.get(
	"/",
	isAdmin,
	accountControllers.getAccounts
)

router.post("/", validateCreateAccount, createAccount)

router.post(
	"/admin",
	isAdmin,
	accountControllers.createAdminAccount
)
router.get("/@me", isAuthenticated, accountControllers.getAccountData)

router.get(
	"/:id",
	isAdmin,
	accountControllers.getAccountById
)

router.patch(
	"/:id",
	isAdmin,
	accountControllers.editAccount
)

router.delete(
	"/:id",
	isAdmin,
	accountControllers.deleteAccount
)

export default router