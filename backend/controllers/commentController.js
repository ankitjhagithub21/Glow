const User = require('../models/user')
const Post = require('../models/post')
const Comment = require("../models/comment")

const addComment = async (req, res) => {
    const { postId, content } = req.body;

    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized." })
        }

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found." })
        }

        if (content.length < 0) {
            return res.status(404).json({ success: false, message: "Can not send empty comment." })
        }
        const comment = new Comment({
            user: user._id,
            post: post._id,
            content
        })

        let newComment = await comment.save()

        post.comments.push(newComment._id)

        await post.save()

        newComment = await newComment.populate('user', 'username profileImg')
        
        res.status(201).json({ success: true, message: "Comment added.", comment: newComment })






    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error." })
    }
}

const getComments = async (req, res) => {
    const postId = req.params.id
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized." })
        }

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found." })
        }

        const comments = await Comment.find({ post: postId }).populate('user', 'username profileImg').sort({ createdAt: -1 })

        res.json({ success: true, comments })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

const deleteComment = async (req, res) => {

    const { postId, commentId } = req.params

    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized." })
        }

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found." })
        }

        const comment = await Comment.findById(commentId)

        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found." })
        }
        
        if(comment.user.toString() !== user._id.toString()){
            return res.status(401).json({ success: false, message: "You can not delete this comment." })
        }

        await Comment.deleteOne({ _id: commentId })
        const commentIndex = post.comments.indexOf(commentId)

        if (commentIndex !== -1) {
            post.comments.splice(commentIndex, 1)
        }


        await post.save()


        res.status(200).json({ success: true, message: "Comment deleted." })






    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error." })
    }
}


module.exports = {
    addComment,
    getComments,
    deleteComment
}
