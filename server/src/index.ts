import express, { Express, Request, Response } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import "dotenv/config"

import Server from "./server"

const app: Express = express()

// routers imports

// middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// start server
Server.startServer(app)

// routes
app.get("/", (req: Request, res: Response) => {
	res.send("Hello, TypeScript Express!")
})
