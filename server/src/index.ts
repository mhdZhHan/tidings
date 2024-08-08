import express, { Express, Request, Response } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import "dotenv/config"

import Server from "./server"
import SocketServer from "./socket"

const app: Express = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// start server
Server.startServer(app)
// init socket
SocketServer.initSocketServer(app)

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

		// Find all users except the one with the specified userId
		const users = await User.find({ _id: { $ne: userId } })

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

/**
 * POST /send-request
 *
 * Sends a chat request from one user to another.
 *
 * Request Body:
 * - senderId: The ID of the user sending the request.
 * - receiverId: The ID of the user receiving the request.
 * - message: The message to be included with the request.
 *
 * Response:
 * - 200: A success message indicating the request was sent successfully.
 * - 404: An error message indicating that the receiver was not found.
 * - 500: An error message indicating a server error occurred while sending the request.
 */
app.post("/send-request", async (req: Request, res: Response) => {
	try {
		const { senderId, receiverId, message } = req.body

		// Find the receiver user by ID
		const receiver = await User.findById(receiverId)
		if (!receiver) {
			return res.status(404).json({ message: "Receiver not found" })
		}

		// Add the request to the receiver's requests array
		receiver.requests.push({
			from: senderId,
			message: message,
		})
		await receiver.save()

		// Send a success response
		res.status(200).json({ message: "Request sent Successfully" })
	} catch (error) {
		console.log("Error sending request", error)
		res.status(500).json({ message: "Error sending request", error: error })
	}
})

/**
 * GET /get-requests/:userId
 *
 * Retrieves all friend requests for the specified user.
 *
 * Request Params:
 * - userId: The ID of the user whose requests are to be fetched.
 *
 * Response:
 * - 200: An array of request objects with sender information (name, email).
 * - 404: A message indicating the user was not found.
 * - 500: An error message indicating a server error occurred while fetching the requests.
 */
app.get("/get-requests/:userId", async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId

		// Find the user by ID and populate the 'from' field in requests with the user's name and email
		const user = await User.findById(userId).populate(
			"requests.from",
			"name email image"
		)

		if (!user) {
			return res.status(404).json({
				message: "User not found",
			})
		}

		res.status(200).json(user.requests)
	} catch (error) {
		console.log("Error getting request", error)
		res.status(500).json({ message: "Error getting request", error: error })
	}
})

/**
 * POST /accept-request
 *
 * Accepts a friend request by updating the user's friend list and removing the request.
 *
 * Request Body:
 * - userId: The ID of the user accepting the request.
 * - requestId: The ID of the user who sent the request.
 *
 * Response:
 * - 200: A message indicating the request was accepted successfully.
 * - 404: A message indicating the user or the request was not found.
 * - 500: An error message indicating a server error occurred while accepting the request.
 */
app.post("/accept-request", async (req: Request, res: Response) => {
	try {
		const { userId, requestId } = req.body

		// Find the user who is accepting the request
		const user = await User.findById(userId)

		if (!user) {
			return res.status(404).json({
				message: "User not found",
			})
		}

		// Remove the request from the user's request list
		const updateUser = await User.findByIdAndUpdate(
			userId,
			{
				$pull: { requests: { from: requestId } },
			},
			{ new: true }
		)

		if (!updateUser) {
			return res.status(404).json({ message: "Request not found" })
		}

		// Add the request sender to the user's friends list
		await User.findByIdAndUpdate(userId, {
			$push: { friends: requestId },
		})

		// Add the user to the request sender's friends list
		const friendUser = await User.findByIdAndUpdate(requestId, {
			$push: { friends: userId },
		})

		if (!friendUser) {
			return res.status(404).json({ message: "Receiver not found" })
		}

		res.status(200).json({ message: "Request accepted successfully" })
	} catch (error) {
		console.log("Error getting request", error)
		res.status(500).json({ message: "Error getting request", error: error })
	}
})

/**
 * GET /user/:userId
 *
 * This route retrieves the friends of a specific user based on their user ID.
 * When a GET request is made to this endpoint, it fetches the user's friends' data including their name, email, and image.
 *
 * Request Params:
 * - userId: The ID of the user whose friends are to be retrieved.
 *
 * Response:
 * - 200: An array of user objects representing the friends of the user with the specified userId.
 * - 500: An error message indicating a server error occurred while fetching the user's friends.
 */
app.get("/user/:userId", async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId

		// Find the user by ID and populate the friends field, selecting only name, email, and image fields of friends
		const user = await User.findById(userId).populate(
			"friends",
			"name email image"
		)

		res.status(200).json(user?.friends)
	} catch (error) {
		console.log("Error getting request", error)
	}
})

import { userSocketMap, io } from "./socket"

app.post("/send-message", async (req: Request, res: Response) => {
	try {
		const { senderId, receiverId, message } = req.body

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		})

		await newMessage.save()

		const receiverSocketId = userSocketMap[receiverId]

		if (receiverSocketId) {
			console.log(
				"Emitting receive message event to the receiver",
				receiverId
			)

			io.to(receiverSocketId).emit("newMessage", newMessage)
		} else {
			console.log("Receiver socket id not found")
		}

		res.status(201).json(newMessage)
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({
				message: "Error sending message",
				error: error.message,
			})
		} else {
			res.status(500).json({ message: "Unknown error occurred" })
		}
	}
})

app.get("/messages", async (req: Request, res: Response) => {
	try {
		const { senderId, receiverId } = req.query

		const messages = await Message.find({
			$or: [
				{ senderId: senderId, receiverId: receiverId },
				{ senderId: receiverId, receiverId: senderId },
			],
		}).populate("senderId", "_id name")

		res.status(200).json(messages)
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({
				message: "Error getting messages",
				error: error.message,
			})
		} else {
			res.status(500).json({ message: "Unknown error occurred" })
		}
	}
})
