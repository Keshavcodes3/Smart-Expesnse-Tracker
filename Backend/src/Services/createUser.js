import userModel from "../Models/user.model";
import bcrypt from "bcryptjs";
export const createUser=async({fullname,email,password,avatar})=>{
    const hashedPassword=await bcrypt.hash(password,10);
    return userModel.create({fullname,email,password:hashedPassword,avatar});
}