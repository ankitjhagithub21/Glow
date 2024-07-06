const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post' 
    },
    content: {
        type: String,
        required:true
    },
   
    createdAt: {
        type: Date,
        default: Date.now
    }

   
    
});

const Comment = mongoose.model('Comment',commentSchema );

module.exports = Comment;
