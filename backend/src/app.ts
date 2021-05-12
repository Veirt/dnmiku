import dotenv from "dotenv"
dotenv.config()
import { DNMembershipConfig, DNWorldConfig } from "@config/typeorm.config"
import router from "@api/v1/routes"
import oauthRouter from "@api/v1/routes/oauth"
import "reflect-metadata"
import { createConnection } from "typeorm"
import express from "express"
import passport from "passport";

(async () => {
	await createConnection(DNMembershipConfig)
	await createConnection(DNWorldConfig)
})()

const app = express()
app.use(passport.initialize())
app.use("/api/v1", router)
app.use("/api/v1/oauth", oauthRouter)

app.listen(8080, () => console.log("Listening on http://localhost:8080"))
