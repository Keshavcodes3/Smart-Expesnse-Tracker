import blackListModel from "../Models/blackList.model";
import userModel from "../Models/user.model";
import jwt from 'jsonwebtoken'
export const IdentifyUser=async(req,res,next)=>{
    let decoded;
    const {token}=req.cookies
    const isBlackListed=await blackListModel.findOne({token})
    if(isBlackListed){
        return res.status(401).json({
            message:'Unauthorized access',
            success:false,
            error:"Invalid token"
        })
    }
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return err;
    }
    req.user=decoded
    next()
}