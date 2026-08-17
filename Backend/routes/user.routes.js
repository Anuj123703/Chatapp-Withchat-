import express from "express"
import isAuth from "../middleware/isauth.js"
import { editprofile, getCurrentuser } from "../controllers/user.controller.js"
import { upload } from "../middleware/Multer.js"
import { getOtherUsers } from '../controllers/user.controller.js';

const userrouter = express.Router()

userrouter.get("/current", isAuth, getCurrentuser  )
userrouter.get("/others", isAuth, getOtherUsers  ) 
userrouter.put("/profile", isAuth,upload.single("image"), editprofile  )


export default userrouter