import User from '../models/userModel.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import AppError from '../utils/AppError.js';
import successResponse from '../utils/successResponse.js'
import { setAuthCookie } from '../utils/setCookies.js';

export const register = asyncHandler(async (req, res, next) => {
    const { username, email, phone, password, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] })

    if (existingUser) {
        return next(new AppError("User already exists with this email or Phone", 400))
    }

    const user = new User({
        username,
        email,
        phone,
        password,
        role
    })

    await user.save()

    user.password = undefined;

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    console.table(accessToken,refreshToken);
    

    setAuthCookie(res,accessToken,refreshToken)

    return successResponse(res, 201, "User registered successfully", {
        user,
        token: {
            accessToken,
            refreshToken
        }
    })

})


export const login = asyncHandler(async (req, res, next) => {
    const { email, phone, password } = req.body;

    const user = await User.findOne({
        $or: [{ email }, { phone }]
    }).select("+password")

    if (!user) {
        return next(new AppError("User does not exist", 400))
    }

    const isMatched = await user.comparepassword(password)

    if (!isMatched) {
        return next(new AppError("Please enter correct passowrd", 401))
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    console.log(accessToken,refreshToken)
    setAuthCookie(res,accessToken,refreshToken)
    
    user.password = undefined;
    return successResponse(res, 200, "Login successful", {
        user
    })
}) 

export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
        .select("-password -refreshTokens");

        console.log("user in get user",user);
        

    return successResponse(
        res,
        200,
        "User fetched successfully",
        user
    );
});

//logout for single device
export const logout = asyncHandler(async(req,res,next) =>{
   const refreshToken = req.cookies?.refreshToken

   if(!refreshToken){
    return next(new AppError("Token not found", 400))
   }

   const user = await User.findOne({"refreshTokens.token" : refreshToken})

   if (user) await user.removeRefreshToken(refreshToken);

   res.clearCookie("accessToken")
   res.clearCookie("refereshToken")

    return successResponse(res,200,"Logout successfully",)
})


//logout for all 
export const logoutAll = asyncHandler(async(req,res,next) =>{
    const userId = req.user.id
    
    const user = await User.findById(userId)

    if(!user){
        return next(new AppError("User not found", 400))
    }

    user.clearAllRefreshTokens();

    user.save();

    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")

    return successResponse(res, 200 , "Logged out from all devices");
})


export const refreshAccessToken = asyncHandler(async(req,res,next) =>{
    const oldRefreshToken = req.cookies.refreshToken

    if(!oldRefreshToken){
        return next(new AppError("Unauthorized, refresh token", 401))
    }

    const user = await User.findOne({"refreshTokens.token" : oldRefreshToken})

    if(!user){
        return next(new AppError("Refresh token invalid", 404))
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateAccessToken()

    await user.removeRefreshToken(oldRefreshToken)
    await user.addRefreshToken(newRefreshToken)

    setAuthCookie(res, newAccessToken, newRefreshToken)

    return successResponse(res,200, "New access token issued")
})

