// Controller for register user

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";



const generateToken = (userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
    return token;

}

// POST: /api/users/register
export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

          if(!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ message: "User already exists" });
        }
         
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashPassword });

        
    //    return success message
      const token = generateToken(newUser._id);
      newUser.password = undefined;

      return res.status(201).json({ user: newUser, token , message: "User registered successfully" });

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
    }
    
}

// login 
// POST: /api/users/login

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

          if( !email || !password) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Invalid email or password..." });
        }

        // check password is correct
       if(!user.comparePassword(password)){
        return res.status(400).json({ message: "Invalid email or password..." });
       }

    //    generate token
        
    //    return success message
      const token = generateToken(user._id);
      user.password = undefined;

      return res.status(200).json({ user, token , message: "Login successfully" });

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
    }
    
}

// controller for getting user by id
// GET : /api/users/data

export const getUserById = async (req, res) => {

    try {

        const userId = req.userId;
        // check if user exists
        const user = await User.findById(userId).select("-password");

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        // return user
        user.password = undefined;

      return res.status(200).json({ user, message: "User found" }); 
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
    }
    
}

// Controller for getting user Resume
// GET : /api/users/resumes
export const getUserResume = async (req, res) => {

    try {
        const userId = req.userId;
        // return user resumes
        const resumes = await Resume.find({ userId: userId });
        return res.status(200).json({ resumes, message: "User resumes found" });

    } catch (error) {
         console.log(error.message);
        return res.status(400).json({ message: error.message });
    }
}