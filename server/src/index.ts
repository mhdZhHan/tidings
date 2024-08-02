import express, { Express, Request, Response } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import "dotenv/config"

import Server from "./server"

const app: Express = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// start server
Server.startServer(app)

/**
 *  ======================================================================
 *  ======================================================================
 *  ======================================================================
 */

// imports
import jwt from "jsonwebtoken"
import crypto from "node:crypto"

// models
import { User } from "./models/user"
import { Message } from "./models/message"

// routes
app.get("/", (req: Request, res: Response) => {
	res.send("Hello, TypeScript Express!")
})

/**
 * POST User Register
 */

app.post("/register", async (req: Request, res: Response) => {
	const { name, email, password } = req.body

	/**
	 * validations password hashing (future)
	 */

	const user = new User({ name, email, password })

	user.save()
		.then(() =>
			res.status(200).json({
				message: "User registered successfully",
			})
		)
		.catch((error) => {
			console.log("Error creating user", error)
			res.status(500).json({
				message: "Error registering user",
				error: error?.message,
			})
		})
})

/**
 * POST User Login
 */

app.post("/login", async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

		// validation (future)

		const user = await User.findOne({ email })

		if (!user) {
			return res.status(401).json({
				message: "No user found with this email address",
			})
		}

		if (password !== user.password) {
			return res.status(401).json({
				message: "Invalid password",
			})
		}

		const secretKey: string = crypto.randomBytes(32).toString("hex")
		const access_token: string = jwt.sign({ userId: user._id }, secretKey)

		res.status(200).json({
			message: "Login successfully",
			access_token: access_token,
		})
	} catch (error) {
		console.log("Error login user", error)
		res.status(500).json({
			message: "Error login user",
			error: error,
		})
	}
})
