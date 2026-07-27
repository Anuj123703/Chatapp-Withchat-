import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./config/db.js"
import authrouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"

dotenv.config()

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authrouter)

app.listen(port, () => {
    ConnectDB()
    console.log(`Server is running on port ${port}`)
})