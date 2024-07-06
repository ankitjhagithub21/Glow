const express = require('express')
const multer = require('multer')
const verifyToken = require('../middlewares/verifyToken')
const { uploadPost, deletePost, editPost, getAllPost } = require('../controllers/postController')

const postRouter = express.Router()

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null,file.originalname)
      }
})


const upload = multer({storage})

postRouter.post("/upload",verifyToken,upload.single('image'),uploadPost)
postRouter.delete("/delete/:id",verifyToken,deletePost)
postRouter.put("/edit/:id",verifyToken,editPost)
postRouter.get("/all",verifyToken,getAllPost)


module.exports = postRouter
