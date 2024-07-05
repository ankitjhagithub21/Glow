
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength:3
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength:3,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minLength:6,
    },
    joined: {
        type: Date,
        default: Date.now()
    },
    profileImg:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }

});



const User = mongoose.model('User', userSchema);

module.exports = User;
