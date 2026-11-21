import express from "express"
import isAuth from "../middleware/isAuth.js"
import { upload } from "../middleware/Multer.js"
import { sendMessage } from "../controllers/message.controller.js"
import { getMessages } from "../controllers/message.controller.js"

const messageRouter = express.Router()

messageRouter.post("/send/:receiverid", isAuth, upload.single("image"), sendMessage)
messageRouter.get("/messages/:receiverid", isAuth, getMessages)

export default messageRouter
