const express = require('express')
const { getOtherUsers, getUserProfile, followUnfollowUser, updateProfile } = require('../controllers/userController')
const verifyToken = require('../middlewares/verifyToken')
const userRouter = express.Router()


userRouter.get("/others",verifyToken,getOtherUsers)
userRouter.get("/profile/:id",getUserProfile)
userRouter.get("/follow/:id",verifyToken,followUnfollowUser)
userRouter.post("/profile/update",verifyToken,updateProfile)

module.exports = userRouter