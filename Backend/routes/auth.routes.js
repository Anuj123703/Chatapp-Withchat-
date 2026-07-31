import express from "express"
import { register,login,logout } from "../controllers/auth.controller.js"

const authrouter = express.Router()

authrouter.post("/login", login)
authrouter.post("/register", register)
authrouter.get("/logout", logout)

export default authrouter