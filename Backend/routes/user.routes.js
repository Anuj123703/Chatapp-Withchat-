import express from "express"
import isAuth from "../middleware/isauth.js"
import { getCurrentuser } from "../controllers/user.controller.js"

const userrouter = express.Router()

userrouter.get("/current", isAuth, getCurrentuser  )


export default userrouter