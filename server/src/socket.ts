import { createServer } from "node:http"
import { Server, Socket } from "socket.io"
import type { Express } from "express"

/**
 * The `SocketServer` class is responsible for initializing and managing the Socket.IO server.
 *
 * This class encapsulates logic for:
 * - Creating an HTTP server using an Express application.
 * - Initializing the Socket.IO server for real-time communication.
 * - Handling new socket connections and managing user sessions.
 * - Mapping user IDs to socket IDs for enabling direct messaging between users.
 * - Handling user disconnections and cleaning up the user-socket mapping.
 * - Handling the sending and receiving of messages between users.
 *
 * Usage:
 * - Call `SocketServer.initSocketServer(app)` to start the Socket.IO server, where `app` is your Express application.
 *
 * The `initSocketServer` method:
 * - Reads the Socket.IO server port from environment variables or defaults to port 3001.
 * - Sets up event listeners for socket connections, disconnections, and message events.
 * - Logs connection and disconnection events for debugging purposes.
 * - Maintains a mapping of user IDs to socket IDs for efficient message routing.
 *
 * This modular approach ensures the socket server logic is maintainable, scalable, and easy to integrate with an Express application.
 */

type UserSocketMap = {
	[userId: string]: string
}

export default class SocketServer {
	static io: Server
	static userSocketMap: UserSocketMap = {}

	static initSocketServer = async (app: Express) => {
		const SOCKET_IO_PORT: number =
			Number(process.env.SOCKET_IO_PORT) || 3001
		const httpServer = createServer(app)

		// Initialize `io` and store it in the static property
		SocketServer.io = new Server(httpServer)
		const io = SocketServer.io

		io.on("connection", (socket: Socket) => {
			console.log("A user connected", socket.id)
			const userId = socket.handshake.query.userId as string

			if (userId && typeof userId === "string") {
				SocketServer.userSocketMap[userId] = socket.id
			}

			console.log("User socket data", SocketServer.userSocketMap)

			socket.on("disconnect", () => {
				console.log("A user disconnected", socket.id)
				const userIdToRemove = Object.keys(
					SocketServer.userSocketMap
				).find((key) => SocketServer.userSocketMap[key] === socket.id)
				if (userIdToRemove) {
					delete SocketServer.userSocketMap[userIdToRemove]
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
					const receiverSocketId =
						SocketServer.userSocketMap[receiverId]
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

		httpServer.listen(SOCKET_IO_PORT, () =>
			console.log(
				`Socket.io running on https//localhost:${SOCKET_IO_PORT}`
			)
		)
	}
}

export const { userSocketMap, io } = SocketServer
