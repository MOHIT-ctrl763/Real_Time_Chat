import jwt from "jsonwebtoken"
const isAuth=async (req,res,next)=>{
    try {
        const authorization = req.get("authorization")
        const bearerToken = authorization?.startsWith("Bearer ") ? authorization.slice(7) : null
        let token = bearerToken || req.cookies.token
        if(!token){
            return res.status(400).json({message:"token is not found"})
        }

        let verifyToken=  jwt.verify(token,process.env.JWT_SECRET)
        req.userId=verifyToken.userId
        next()


    } catch (error) {
        console.log(error)
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({message:"invalid or expired token"})
        }
        return res.status(500).json({message:`isauth error ${error}`})
    }
}

export default isAuth
