import bcrypt from 'bcrypt'
import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
const UserSchema = new Schema({
    username:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        sparse:true
    },
    phone:{
        type:String,
        unique:true,
        sparse:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },

    //role for user ans seller and admin
    role:{
        type:String,
        enum:["user", "seller", "admin"],
        default:"user"
    },
    
    //Multiple device Refresh Token
    refreshTokens :[
        {
            token:String,
            createdAt:{
                type:Date,
                default:Date.now()
            }
        }
    ],
    
    //for forgot password
    otp: {
        type:String
    },
    otpExpires:{
        type:Date
    },
    
    //token link method for forgot password
    resetPasswordToken: String,
    resetPasswordExpires: Date,




},{timestamps:true})


//hashing password before save
UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


//comparing password
UserSchema.methods.comparepassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//generating access token 
UserSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        id:this._id,
        role:this.role
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"15m"
    }
)
}

//generating referesh token 
UserSchema.methods.generateRefreshToken  = async function(){
   return jwt.sign({
    id:this._id,
    role:this.role
   },
   process.env.REFRESH_TOKEN_SECRET,{
    expiresIn:"7d"
   }
    )
}

//adding refresh token in database
UserSchema.methods.addRefreshToken = function(token){
    this.refreshTokens.push(token)
    return this.save();
}

//removing refreshToken from database for individual device logout
UserSchema.methods.removeRefreshToken = function(token){
    this.refreshTokens = this.refreshTokens.filter((items) => items.token !== token)
    return this.save();
}


//removing referesh token for all device logout
UserSchema.methods.clearAllRefreshTokens = function(){
    this.refreshTokens = [];
    return this.save();
}

//generate otp for forgot password
UserSchema.methods.generateOTP = function(){

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    this.otp = otp;
    this.otpExpires = Date.now() + 5 * 60 *1000;

    return this.otp;
}

//verify otp
UserSchema.methods.verifyOtp = function(enteredOtp){

    if(!this.otp || !this.otpExpires) return false;
    const verify = this.otp === enteredOtp && this.otpExpires > Date.now();
    return verify;
}


//clear otp after use
UserSchema.methods.clearOtp = function(){
    this.otp = undefined;
    this.otpExpires = undefined;
}


UserSchema.methods.generatePasswordToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex")

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpires = Date.now() + 5 * 60 * 1000;

    return resetToken;
}








export default mongoose.model("User", UserSchema)