import express from 'express'

const router = express.Router();
import authRoutes from './Auth/authRoutes.js'
import productRoutes from './product/productRoutes.js'
router.use("/auth",authRoutes)
router.use("/product",productRoutes)
export default router