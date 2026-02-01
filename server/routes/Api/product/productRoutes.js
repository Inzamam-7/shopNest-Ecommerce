import express from 'express'
const router = express.Router();

import {addProduct, getAllProduct, getSellerProduct, toggleArchiveProduct, updateProduct} from '../../../controller/productControler.js'
import { Protect } from '../../../middleware/authMiddleware.js';
import { authorizedRoles } from '../../../middleware/roleMiddleware.js';
import { upload } from '../../../middleware/multer.js';

router.post("/add-product", upload.single("image"),addProduct)
router.put("/update-product", upload.single("image"),updateProduct)
router.post("/toggle-archive",toggleArchiveProduct)
router.get("/get-all-product",getAllProduct)
router.get("/get-seller-product",getSellerProduct)
export default router