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
        const followingUser = await User.findById(req.userId)
       
        
        if(!followingUser){
            return res.status(401).json({
                success:false,
                message:"You are not authorized."
            })
        }
        const followedUser = await User.findById(req.params.id)
        
        if(!followedUser){
            return res.status(404).json({
                success:false,
                message:"User not found.."
            })
        }
        const index =  followingUser.following.indexOf(followedUser._id)

        if(index==-1){
            followingUser.following.push(followedUser._id)
            followedUser.followers.push(followingUser._id)
            await Promise.all([followingUser.save(),followedUser.save()])
            res.status(200).json({
                success:true,
                message:`You are now following ${followedUser.username}.`
            })
    
        }else{
            followingUser.following.splice(index,1)
            const followingUserIndex =  followedUser.followers.indexOf(followingUser._id)
            if(followingUserIndex!=-1){
                followedUser.followers.splice(followingUserIndex,1)
            }
            await Promise.all([followingUser.save(),followedUser.save()])
            res.status(200).json({
                success:true,
                message:`You are unfollowed ${followedUser.username}.`
            })
        }

     

       
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        const { fullName, username, bio, profileImg, coverImg } = req.body;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized."
            });
        }

        if (!fullName || !username) {
            return res.status(400).json({
                success: false,
                message: "Name and username are required."
            });
        }

        const existingUser = await User.findOne({ username, _id: { $ne: user._id } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already registered."
            });
        }

        user.username = username;
        user.fullName = fullName;
        user.bio = bio;
        user.profileImg = profileImg;
        user.coverImg = coverImg;

        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile updated.",
            user
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
};


module.exports = {
    getUserProfile,
    getOtherUsers,
    followUnfollowUser,
    updateProfile
}