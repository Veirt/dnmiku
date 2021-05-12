import express from "express"
import helmet from "helmet"
import cors from "cors"

const configureRouter = (router: express.Router): void => {
	if (process.env.NODE_ENV !== "development") {
		router.use(
			cors({
				origin: "http://localhost:3000",
				credentials: true,
			})
		)
	}
	router.use(express.json())
	router.use(express.urlencoded({ extended: true }))
	router.use(helmet())
}

export default configureRouter
