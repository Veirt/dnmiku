import * as characterControllers from "@api/v1/controllers/character.controller"
import { isAdmin } from "@api/v1/middlewares/auth.middleware"
import { Router } from "express"

const router = Router()

router.get("/", isAdmin, characterControllers.getCharacters)

router.get("/:id", isAdmin, characterControllers.getCharacterById)

router.patch("/:id", isAdmin, characterControllers.editCharacter)

router.delete("/:id", isAdmin, characterControllers.deleteCharacter)

export default router
