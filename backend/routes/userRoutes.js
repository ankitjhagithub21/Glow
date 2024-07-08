const express = require('express')
const { getOtherUsers, getUserProfile } = require('../controllers/userController')
const verifyToken = require('../middlewares/verifyToken')
const userRouter = express.Router()


userRouter.get("/others",verifyToken,getOtherUsers)
userRouter.get("/profile/:id",getUserProfile)

module.exports = userRouter