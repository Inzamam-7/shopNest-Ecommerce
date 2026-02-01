import AppError from '../utils/AppError'

export const globalErrorHandler = (err,req,res,next) =>{
    console.log("Error", err);

    if(err.isOperational){
        return res.status(err.statusCode).json({
            success:false,
            message:err.message
        })
    }

    return res.status(statusCode).json({
        success:false,
        message: "Something went wrong on the server"
    })
    
}