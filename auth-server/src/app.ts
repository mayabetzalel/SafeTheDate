import express from "express"
import "./lib/dotenv-init"
import "./lib/reflect-metadata"
import helmet from "helmet"
import compression from "compression"
import healthRouter from "./routes/health.router"
import authRouter from "./routes/auth.router"
import cors from "cors"
import { errorHandler } from "./utils/error"
import { ConsoleLogger } from "./utils/logger"
import { configureLogger } from "./lib/app-logger"
import cookieParser from "cookie-parser"
import setUpMongo from "../mongo/mongoDbManager"
import { useAuthorizationParser } from "./middlewares/AuthMiddelwares"
const SERVER_PORT = process.env.BACKEND_PORT || 80 // default port of http is 80
// Create Express App and Routes
const app = express()

// ---------App Middlewares--------

app.use(helmet()) // Security headers & policies addon
app.use(compression())

app.use(cookieParser())

app.use(
  cors({
    origin: [process.env.FRONTEND_ENDPOINT!, process.env.BACKEND_ENDPOINT!],
    methods: "DELETE, PUT, POST, GET, OPTIONS",
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Methods",
      "Set-Cookie",
      "X-Requested-With",
    ],
    credentials: true,
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
configureLogger(ConsoleLogger.getInstance())

app.use(useAuthorizationParser())

// PUBLIC ROUTES
app.use("/", healthRouter)
app.use("/health", healthRouter)

setUpMongo()

// CLICK AUTH ROUTES
const router = express.Router()
router.use("/auth", authRouter)

app.use("/api", router)

// Global Error Handler
app.use(errorHandler())

app.listen(SERVER_PORT, () => {
  console.log("Listening on port " + SERVER_PORT)
})
