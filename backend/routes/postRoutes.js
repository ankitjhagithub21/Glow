const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { uploadPost, deletePost, editPost, getAllPost, likeUnlikePost, getUserPost, savePost } = require('../controllers/postController')
const upload = require('../helpers/multer')
const postRouter = express.Router()



postRouter.post("/upload",verifyToken,upload.single('image'),uploadPost)
postRouter.delete("/delete/:id",verifyToken,deletePost)
postRouter.put("/edit/:id",verifyToken,editPost)
postRouter.get("/all",verifyToken,getAllPost)
postRouter.post("/like/:id",verifyToken,likeUnlikePost)
postRouter.get("/user/:id",getUserPost)
postRouter.post("/save/:id",verifyToken,savePost)


module.exports = postRouter
