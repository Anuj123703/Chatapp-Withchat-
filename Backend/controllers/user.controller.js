import uploadcloudinary from "../config/Cloudinary.js"
import User from "../models/user.model.js"
import fs from "fs"
import path from "path"


export const getCurrentuser = async (req, res) => {
    try {
        let userid = req.userid
        let user = await User.findById(userid).select("-password")
        if (!user) {
            return res.status(400).json({ message: "User not find" })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `current user error ${error}` })
    }
}

export const editprofile = async (req, res) => {
    try {
        let { name } = req.body

        let image
        if (req.file) {
            image = await uploadcloudinary(req.file.path)
        }
        let user = await User.findByIdAndUpdate(req.userid,
            {
                name,
                image
            }, {
            new: true
        }
        ).select("-password")
        if (!user) {
            return res.status(400).json({ message: "User not find" })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `Error updating profile ${error}` })
    }
}

export const getOtherUsers = async (req,res) => {
    try {
        let users = await User.find(
            {
                _id:{$ne:req.userid}
            }
        ).select("-password")
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: `get other users error ${error}` })
    }
}