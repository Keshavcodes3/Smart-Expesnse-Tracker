import express from 'express';
import { getUserProfile, loginUser, logoutUser, registerUser } from '../Controllers/user.controller';
import { registerValidator,loginValidator } from '../Validators/user.validator';
import { IdentifyUser } from '../Middleware/user.middleware';
const userRoute=express.Router()


userRoute.post('/register', registerValidator, registerUser)
userRoute.post('/login', loginValidator, loginUser)
userRoute.get('/profile',IdentifyUser,getUserProfile)
userRoute.post('/logout',IdentifyUser,logoutUser)

export default userRoute;