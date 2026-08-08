import User from "../models/user.model.js"


export const getCurrentuser = async (req, res) => {
    try {
        let userid = req.userid
        let user = User.findbyid(userid).select("-password")
        if (!user) {
            return res.status(400).json({meessage : "User not find"})
        }
        return res.status(200).json(user)
    } catch (error) {
     return res.status(500).json({message: `current user error ${error}`})
    }
}