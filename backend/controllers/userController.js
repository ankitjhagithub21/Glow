const User = require("../models/user")


const getUserProfile = async (req, res) => {
    try {


        const user = await User.findById(req.params.id)
            .select("-password")
            .populate([
                {
                    path: "posts",
                    select: "createdAt image",
                    populate: {
                        path: "user",
                        select: "fullName username profileImg"
                    }
                }
            ]);


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found."
            })
        }

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

const getOtherUsers = async (req, res) => {
    try {

        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized."
            })
        }
        const otherUsers = await User.find({ _id: { $ne: user._id } }).select("fullName username profileImg")
        res.status(200).json({
            success: true,
            otherUsers
        });
              
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

const followUnfollowUser = async (req, res) => {
    try {


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}
module.exports = {
    getUserProfile,
    getOtherUsers,
    followUnfollowUser
}