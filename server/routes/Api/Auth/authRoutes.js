import express from 'express'
import {Protect} from '../../../middleware/authMiddleware.js'
const router = express.Router()
import {register,login,getUser,logout,logoutAll,refreshAccessToken} from '../../../controller/authController.js'
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/get-user",Protect,getUser)

export default router