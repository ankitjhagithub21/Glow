const jwt = require('jsonwebtoken')

const verifyToken = async(req,res,next) =>{
    try{

        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({ success: false, message: "Unauthorized." })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({ success: false, message: "Unauthorized." })
        }
        req.userId = decoded.userId
        next()
    }catch(error){
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

module.exports = verifyToken