const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { register, login, logout, getUser } = require('../controllers/authController')
const authRouter = express.Router()

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.get("/user",verifyToken,getUser)


module.exports = authRouter
