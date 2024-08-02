import mongoose from "mongoose"
import type { Express } from "express"

export default class Server {
	static startServer = async (app: Express) => {
		const CONNECTION_URL = process.env.DATABASE_URL as string
		const PORT: number = Number(process.env.PORT) || 3000

		await mongoose
			.connect(CONNECTION_URL, {
				autoIndex: true,
			})
			.then(() => {
				console.log("database connection done.")
				// server listen
				app.listen(PORT, () => {
					console.log(`Server running on http://localhost:${PORT}`)
				})
			})
			.catch((error) => {
				console.log("database connection error: ", error?.message)
			})
	}
}
