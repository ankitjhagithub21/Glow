const generateToken = require("../helpers/generateToken")
const User = require("../models/user");
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        if(!fullName || !username || !email || !password){
            return res.status(400).json({ success: false, message: "All fields are required." })
        }

         if(fullName.length<3 || username.length <3){
            return res.status(400).json({ success: false, message: "Name and username must be 3 characters long." })
         } 

         if(password.length<6){
            return res.status(400).json({ success: false, message: "password must be 6 characters long." })
         } 
              
       
        // Check if the username already exists
        const existingUser = await User.findOne({ username });


        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username already taken." });
        }

        // Check if the email already exists
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ success: false, message: "Email already registered." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        let user  = await newUser.save();

        // Generate a token
        const token = generateToken(newUser._id);

        // Set the token in a cookie
        if (token) {
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
            });
        }
         
        
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        
        res.status(201).json({ success: true, message: "Account created successfully.",user:userWithoutPassword });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Wrong email or password." });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ success: false, message: "Wrong email or password." });
        }

        const token = generateToken(user._id);

        if (token) {
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
            });
        }

        // Convert user document to a plain object and remove the password field
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        // Respond with success
        res.status(200).json({ success: true, message: "Login successful.", user: userWithoutPassword });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};


const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', {
            expires: new Date(Date.now())
        }).status(200).json({ success: true, message: "Logout successfull." })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

module.exports = {
    register,
    login,
    logout,
    getUser
}