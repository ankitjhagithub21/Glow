const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { uploadPost, deletePost, editPost, getAllPost } = require('../controllers/postController')

const postRouter = express.Router()

postRouter.post("/upload",verifyToken,uploadPost)
postRouter.delete("/delete/:id",verifyToken,deletePost)
postRouter.put("/edit/:id",verifyToken,editPost)
postRouter.get("/all",verifyToken,getAllPost)


module.exports = postRouter
