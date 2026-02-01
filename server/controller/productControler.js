import Product from "../models/productModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from '../utils/AppError.js'
import successResponse from '../utils/successResponse.js'
import cloudinary from "../config/cloudinary.js";


export const addProduct = asyncHandler(async(req,res) =>{
    const {name,category,price,stock} = req.body;

    if(!name || !category || !price || !stock){
        throw new AppError("All fields are required", 400)
    }

    if(!req.file){
        throw new AppError("Images are required", 400)
    }

    console.log("ye files h",req.file);
    

    const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "products",
  });

  console.log(result);
  

    const product = await Product.create({
        name,
        category,
        price,
        stock,
        images:[result.secure_url],
        createdBy:undefined
    })

    return successResponse(res,201,"Product created successfully",product)
})


export const updateProduct = asyncHandler(async(req,res) =>{

    const {id} = req.params;

    const product = await Product.findById(id);

    if(!product){
        throw new AppError("Product not found", 404);
    }

    if(product.createdBy.toString() !== req.user._id.toString()){
        throw new AppError("You are not allowed to update", 403);
    }

    const {name, category, price, stock} = req.body;

    if(name) product.name = name;
    if(category) product.category = category;
    if(price) product.price = price;
    if(stock) product.stock = stock;

    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "products"
        })

        product.images = [result.secure_url];
    }

    await product.save();

    return successResponse(res,200,"Product updated successfully", product);

})

// export const deleteproduct = asyncHandler(async(req,res) =>{
//     const {id} = req.params;

//     const product = await Product.findById(id);

//     if(!product){
//         throw new AppError("Product not found",404)
//     }

//     if(product.createdBy.toString() !== req.user._id.toString()){
//         throw new AppError("You are not authorized",403)
//     }
    
//     await product.deleteOne();

//     return successResponse(res,200,"Product deleted successfully")
    
// })


export const toggleArchiveProduct = asyncHandler(async(req,res) =>{
    const {id} = req.params

    const product = await Product.findById(id);

    if(!product){
        throw new AppError("Product not found",404)
    }

    if(product.createdBy.toString() !== req.user._id().toString){
        throw new AppError("You are not authorize",403)
    }

    product.isArchived = !product.isArchived

    const message = product.isArchived
    ? "Product archived successfully"
    : "Product restored successfully";

    return successResponse(res,200,message,product)
})


export const getAllProduct = asyncHandler(async(req,res) =>{

      const product = await Product.find({isArchived:false})

      if(!product){
        throw new AppError("Product not found",404)
      }

      return successResponse(res,200,"Product fetched successfully",product)
})

export const getSellerProduct = asyncHandler(async(req,res) =>{
    const sellerId = req.user._id

    const product = await Product.findById({createdBy:sellerId})

    if(!product || product.length === 0){
        throw new AppError("Product not found",404)
    }

    return successResponse(res,200,"Product found successfully",product)
})