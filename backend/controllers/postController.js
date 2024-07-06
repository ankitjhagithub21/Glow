const { uploadImage } = require("../helpers/cloudinary")
const User = require("../models/user")
const Post = require("../models/post")


const uploadPost = async (req, res) => {

    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized." })
        }
       
        const result = await uploadImage(req.file.path)

        const newPost = new Post({
            user: user._id,
            title: req.body.title,
            image: result,

        })
        user.posts.push(newPost)
        await Promise.all([newPost.save(), user.save()])

        return res.status(201).json({ success: true, message: "Post created successfully." })


    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error." })
    }
}

const deletePost = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized." })
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error." })
    }
}

const editPost = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized." })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error." })
    }
}

const getAllPost = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized." })
        }

        const posts = await Post.find({}).populate(
            {
                path: 'user',
                select: '-password'
            }
        ).sort({ createdAt: -1 });

        res.json({success:true,posts})


    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error." })
    }
}

module.exports = {
    uploadPost,
    deletePost,
    editPost,
    getAllPost
}