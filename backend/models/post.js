const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    title: {
        type: String,
    },
    image: {
        type:Object,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    bookmarks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
