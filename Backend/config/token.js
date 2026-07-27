import jwt from "jsonwebtoken"
const generateToken = async (userid) => {
    try {
        const token = await jwt.sign({ userid }, process.env.JWT_SECRET, { expiresIn: "10d" } )
        return token
    } catch (error) {
        console.log("Error generating token:", error)
    }
}
export default generateToken