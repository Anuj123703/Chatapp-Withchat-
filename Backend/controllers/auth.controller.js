import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import generateToken from "../config/token.js"
import cookieParser from "cookie-parser"

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        await User.findOne({
            $or: [{ username }, { email }]
        })
        if (existingUser) {
            return res.send({ message: "Username or email already exists" })
        }

        if (password.length < 6) {
            return res.send({ message: "Password must be at least 6 characters long" })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const user = await User.create(
            {
                username,
                email,
                password: hashpassword
            }
        )
        const token = await generateToken(user._id)

        res.cookie("token", token, {
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
            httpOnly: true,
            sameSite: "strict", // Ensure cookies are sent only to the same site
            secure: false // false in development, and in production secure true and using https
        }
        )
        return res.status(201).json({ message: "User registered successfully", user })

    } catch (error) {
        console.log("REGISTER ERROR:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const registeredUser = await User.findOne({ email })
        if (!registeredUser) {
            return res.status(404).json({ message: "User not registered" })
        }

        const isMatchpassword = await bcrypt.compare(password, registeredUser.password)
        if (!isMatchpassword) {
            return res.status(401).json({ message: "Incorrect input password" })
        }

        const token = await generateToken(registeredUser._id)

        res.cookie("token", token, {
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
            httpOnly: true,
            sameSite: "strict", // Ensure cookies are sent only to the same site
            secure: false // false in development, and in production secure true and using https
        })
        return res.status(200).json({ message: "User logged in successfully", user:registeredUser })

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        return res.status(500).json({ message: `login failed` })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "User logged out successfully" })
    } catch (error) {
        return res.status(500).json({ message: `logout failed`, })
    }
}
export { register }
export { login }
export { logout }