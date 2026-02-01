import express from 'express'
const router = express.Router();
import apiRoutes from './Api/index.js'

router.use("/api",apiRoutes)

export default router