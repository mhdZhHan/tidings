import { createServer } from "node:http"
import { Server, Socket } from "socket.io"
import type { Express } from "express"

/**
 * SocketServer class is responsible for initializing and managing the Socket.IO server.
 *
 * The class encapsulates the logic for:
 * - Creating the HTTP server using Express
 * - Initializing the Socket.IO server
 * - Handling new socket connections
 * - Mapping user IDs to socket IDs for direct messaging
 * - Managing user disconnections and cleaning up the user-socket map
 * - Handling the sending and receiving of messages between users
 *
 * Usage:
 * - Call `SocketServer.initSocketServer(app)` to start the Socket.IO server, where `app` is your Express application.
 *
 * The `initSocketServer` method:
 * - Reads the socket server port from environment variables or defaults to port 3001
 * - Sets up event listeners for socket connections, disconnections, and message events
 * - Logs connection and disconnection events for debugging
 * - Maintains a mapping of user IDs to socket IDs for efficient message routing
 *
 * This approach ensures that the socket server logic is modular, maintainable, and scalable.
 */

type UserSocketMap = {
	[userId: string]: string
}
const userSocketMap: UserSocketMap = {}

export default class SocketServer {
	static initSocketServer = async (app: Express) => {
		const SOCKET_IO_PORT: number =
			Number(process.env.SOCKET_IO_PORT) || 3001

		const httpServer = createServer(app)
		const io = new Server(httpServer)

		io.on("connection", (socket: Socket) => {
			console.log("A uer connected", socket.id)
			const userId = socket.handshake.query.userId as string

			if (userId && typeof userId === "string") {
				userSocketMap[userId] = socket.id
			}

			console.log("User socket data", userSocketMap)

			socket.on("disconnect", () => {
				console.log("A user disconnected", socket.id)

				// Remove the user from the map when they disconnect
				const userIdToRemove = Object.keys(userSocketMap).find(
					(key) => userSocketMap[key] === socket.id
				)
				if (userIdToRemove) {
					delete userSocketMap[userIdToRemove]
				}
			})

			socket.on(
				"sendMessage",
				({
					senderId,
					receiverId,
					message,
				}: {
					senderId: string
					receiverId: string
					message: string
				}) => {
					const receiverSocketId = userSocketMap[receiverId]

					console.log("Receiver socket id", receiverSocketId)

					if (receiverSocketId) {
						io.to(receiverSocketId).emit("receiveMessage", {
							senderId,
							message,
						})
					}
				}
			)
		})

		// listen socket server
		httpServer.listen(SOCKET_IO_PORT, () =>
			console.log(
				`Socket.io running on https//localhost:${SOCKET_IO_PORT}`
			)
		)
	}
}
