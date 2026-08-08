const isAuth = async(req, res, next) =>{
try {
    let Token = req.cookies.token
    if (!Token){
        return res.status(400).json({message : "Token is not found.."})
    }

    let verifyToken = await jwt.verify(Token, process.env.JWT_SECRET)
    console.log(verifyToken)
    req.userid = verifyToken.userid
    next()
} catch (error) {
    res.status(500).json({message: `isAuth error ${error}`})
    
}
}
export default isAuth