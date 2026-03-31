import userModel from "../Models/user.model";
import bcryptjs from 'bcryptjs'
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import { createUser } from "../Services/createUser";
import bcrypt from "bcryptjs";
import blackListModel from "../Models/blackList.model";
export const registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const isAlreadyExist = await userModel.findOne({ email })
        if (isAlreadyExist) {
            return res.status(401).json({
                message: "User already exist with given email",
                error: "Already email registered",
                success: false
            })
        }
        
        const user = await createUser({ fullname, email, password });
        const userObj = user.toObject();
        delete userObj.password;
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.cookie('token', token);

        return res.status(201).json({
            message: "USer created successfully",
            success: true,
            user: userObj,
            token
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
            success: false
        })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                success: false,
                error: "No user registered"
            })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({
                message: "invalid password",
                success: false,
                error: "Password mismatched"
            })
        }
        const userObj = user.toObject();
        delete userObj.password;
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.cookie('token', token);
        return res.status(200).json({
            message: "User logged in successfuly",
            user:userObj,
            token
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
            success: false
        })
    }
}


export const getUserProfile = async (req, res) => {
    try{
        const userId = req.user.id;
        const user = await userModel.findById(userId).select("-password");
        return res.status(200).json({
            message: "User profile retrieved successfully",
            user,
            success: true
        })
    }catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
            success: false
        })
    }
}

export const logoutUser = async(req,res)=>{
    try{
        const token=req.cookies.token
        await blackListModel.create({
            token
        })
        res.clearCookie('token');
        return res.status(200).json({
            message: "User logged out successfully",
            success: true
        })
    }catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
            success: false
        })
    }
}