import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register new user

export const registerUser = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: "User already existing"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({firstName, lastName, email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
};


// Login User

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

try{
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "Invalid Credentials"});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message: "invalid Credentials"});

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:"1h"});
    res.json({
        token,
        message: "Login Successful",
        user:{
            id: user._id,
            email: user.email
        }
    });
} catch(error){
    res.status(500).json({message: "Server error"});
}
};


// Get user information

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({message: "User not found"});

        res.json(user); 
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

export const getDashboard = async (req, res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({message: "User not found"});

        res.json({
            userId: req.user.id,
            firstName: user.firstName,
            lastName: user.lastName,
        }); 
    } catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

