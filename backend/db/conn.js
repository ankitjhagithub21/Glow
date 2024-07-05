const mongoose = require('mongoose')

const connectDb = () =>{
    mongoose.connect(process.env.MONGO_URI).then((data)=>{
        console.log("Database connected.")
    }).catch((error)=>{
        console.log(error)
    })
}

module.exports = connectDb