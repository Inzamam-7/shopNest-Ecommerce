import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js'
import AppError from '../utils/AppError.js'
import User from '../models/userModel.js'


export const Protect = asyncHandler(async(req,res,next) =>{
    const token = req.cookies.accessToken
    console.log("yeh token h ",token);
    
    if(!token){
        return next(new AppError("Not aurthorized, missing token",401))
    }

    let decoded 

    try{
        decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    }catch(error){
        return next(new AppError("Token expired or invalid token", 401))
    }

    const user = await User.findById(decoded.id).select("-password")

    if(!user){
        return next(new AppError("User no longer exists", 401))
    }

    req.user = user;
    console.log("req.user",req.user);
    
    next();
})