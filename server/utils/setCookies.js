export const setAuthCookie = (res,accessToken,refreshToken) =>{
  
    res.cookie("accessToken", accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        samesite:"none",
        path:"/",
        maxAge:15*60*1000
    });

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        samesite:"none",
        path:"/",
        maxAge:7*24*60*60*1000
    })
}