const express = require('express')
const { getOtherUsers, getUserProfile, followUnfollowUser, updateProfile } = require('../controllers/userController')
const verifyToken = require('../middlewares/verifyToken')
const upload = require('../helpers/multer')
const userRouter = express.Router()


userRouter.get("/others",verifyToken,getOtherUsers)
userRouter.get("/profile/:id",getUserProfile)
userRouter.get("/follow/:id",verifyToken,followUnfollowUser)
userRouter.post("/profile/update",upload.single('profileImg'),verifyToken,updateProfile)


module.exports = userRouter