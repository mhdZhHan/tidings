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
 * POST /register
 *
 * Registers a new user with the provided name, email, and password.
 *
 * Request Body:
 * - name: The name of the user to be registered.
 * - email: The email address of the user to be registered.
 * - password: The password for the user.
 *
 * Response:
 * - 200: Success. Returns a success message when the user is registered successfully.
 *   - message: "User registered successfully"
 * - 500: Internal Server Error. Returned if an unexpected error occurs during registration.
 *   - message: "Error registering user"
 *   - error: Details of the error encountered (e.g., database or validation errors).
 */
app.post("/register", async (req: Request, res: Response) => {
	const { name, email, password } = req.body

	/**
	 * Validations and password hashing should be implemented in the future.
	 * For example, you should check if the email is already in use,
	 * validate password strength, and hash the password before saving.
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
 * POST /login
 *
 * Authenticates a user by their email and password.
 *
 * Request Body:
 * - email: The email address of the user trying to log in.
 * - password: The password for the user.
 *
 * Response:
 * - 200: Success. Returns a success message and an access token if login is successful.
 *   - message: "Login successfully"
 *   - access_token: JWT token for the authenticated user.
 * - 401: Unauthorized. Returned if the email does not exist or the password is incorrect.
 *   - message: "No user found with this email address" or "Invalid password".
 * - 500: Internal Server Error. Returned if an unexpected error occurs during login.
 *   - message: "Error login user"
 *   - error: Details of the error encountered.
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

/**
 * GET /users/:userId
 *
 * Retrieves all users except the one with the specified user ID.
 *
 * Request Params:
 * - userId: The ID of the user to be excluded from the result.
 *
 * Response:
 * - 200: An array of user objects (excluding the user with the specified userId).
 * - 500: An error message indicating a server error occurred while fetching users.
 */
app.get("/users/:userId", async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId
		const users = await User.find({ _Id: { $ne: userId } })

		res.status(200).json({
			users,
		})
	} catch (error) {
		console.log("Error getting user", error)
		res.status(500).json({
			message: "Error getting user",
			error: error,
		})
	}
})

app.post("/send-request", async (req: Request, res: Response) => {
	const { senderId, receiverId, message } = req.body

	const receiver = await User.findById(receiverId)
	if (!receiver) {
		return res.status(404).json({ message: "Receiver not found" })
	}

	receiver.requests.push({ from: senderId, message })
	await receiver.save()

	res.status(200).json({ message: "Request sent Successfully" })
})
