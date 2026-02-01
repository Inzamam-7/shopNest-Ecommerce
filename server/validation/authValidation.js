import joi from 'joi'

const emailorpasswordValidator = joi.string().custom((value,helper) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if(!emailRegex.test(value) && !phoneRegex.test(value)){
        return helper.message("Enter a valid email or phone number")
    }
    return value;
} )

export const registerSchema = joi.object({
    email:joi.string().email.allow("", null),
    phone:joi.string().pattern(/^[0-9]{10}$/).allow("",null),
    password:joi.string().min(6).required().message({
        "string.min":"Password must be at least 6 character"
    }),
    role:joi.string().valid("user", "seller", "admin").default("user")

}).custom((data, helper) =>{
    if(!data.email && !data.phone){
        return helper.message("Either email or phone required");
    }
    return data;
})

export const loginValidation = joi.object({
    emailOrPhone:emailorpasswordValidator.required(),
    password:joi.string().required()
})