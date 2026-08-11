import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./config/db.js"
import authrouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import userrouter from "./routes/user.routes.js"

const port = process.env.PORT || 7000

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authrouter)
app.use("/api/user", userrouter)

app.listen(port, () => {
    ConnectDB()
    console.log(`Server is running on port ${port}`)
})