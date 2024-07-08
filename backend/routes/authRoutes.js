const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { register, login, logout, getUser,getUserProfile } = require('../controllers/authController')
const authRouter = express.Router()

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.get("/user",verifyToken,getUser)
authRouter.get("/user/:id",getUserProfile)


module.exports = authRouter
