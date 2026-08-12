import express from "express"
import isAuth from "../middleware/isauth.js"
import { editprofile, getCurrentuser } from "../controllers/user.controller.js"
import { upload } from "../middleware/Multer.js"

const userrouter = express.Router()

userrouter.get("/current", isAuth, getCurrentuser  )
userrouter.put("/profile", isAuth,upload.single("image"), editprofile  )


export default userrouter