import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: [true, 'first name is required'],
        },
        lastname: {
            type: String,
            required: [true, 'last name is required'],
        }
    }, totalMoney: {
        type: Number,
        default: 0,
        select: false
    },
    totalExpense: {
        type:Number,
        default:0,
        select:false
    },
    totalIncome:{
        type:Number,
        default:0,
        select:false
    },
    email: {
        type: String,
        required: [true, 'Email is required to create an account'],
        unique: [true, "Email already exist"]
    },
    password: {
        type: String,
        required: [true, "Password is required to create an account"],
        minlength: [5, "Password must be at least 5 characters"]
    },
}, { timestamps: true })

const userModel = mongoose.model("User", userSchema)


export default userModel