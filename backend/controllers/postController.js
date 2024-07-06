const { uploadImage, deleteImage } = require("../helpers/cloudinary")
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
    const postId = req.params.id;

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized." });
        }

        const postIndex = user.posts.indexOf(postId);
        if (postIndex === -1) {
            return res.status(403).json({ success: false, message: "You do not have access to delete this post." });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found." });
        }

        await deleteImage(post.image.publicId);

        // Remove the post from the user's posts array
        user.posts.splice(postIndex, 1);

        // Delete the post
        await post.deleteOne();

        // Save the user without waiting
        await user.save();

        res.json({ success: true, message: "Post deleted." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
};


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