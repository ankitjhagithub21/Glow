const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { addComment, getComments, deleteComment } = require('../controllers/commentController')
const commentRouter = express.Router()

commentRouter.post("/add",verifyToken,addComment)   
commentRouter.get("/:id",verifyToken,getComments)
commentRouter.delete("/:commentId/post/:postId",verifyToken,deleteComment)

module.exports = commentRouter