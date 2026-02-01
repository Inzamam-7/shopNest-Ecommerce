import AppError from "../utils/AppError.js"

export const authorizedRoles = (...allowedRoles) =>{
    return (req,res,next) =>{
        if(!allowedRoles.includes(req.user.role)){
            return next(new AppError("Unauthorized user",403))
        }
        next();
    }
}