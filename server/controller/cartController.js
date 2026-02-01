import Cart from '../models/cartModels.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import AppError from '../utils/AppError.js';
import Product from '../models/productModel.js'
import successResponse from '../utils/successResponse.js';


export const addToCart = asyncHandler(async(req,res) =>{
    const userId = req.user._id;

    const {productId,quantity} = req.body;

    if(!productId || !quantity){
        throw new AppError("All fields are required",400)
    }

    const product = await Product.findById(productId)

    if(!product || product.isArchived){
        throw new AppError("Product not available",404)
    }

    let cart = await Cart.findOne({user:userId})
    if(!cart){
        cart = new cart({user:userId, items:[]})
    }

    const existingCart = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if(existingCart){
        existingCart.quantity += quantity;
    }else{
        cart.items.push({product:productId, quantity})
    }

    await cart.save();

    const populatedCart = await cart.populate("items.product", name,price,image,category)

    return successResponse(res,200,"Added to Cart Successfully",populatedCart)

})

export const removeFromCart = asyncHandler(async(req,res) =>{
    const userId = req.user._id

    const {productId} = req.body

    const cart = await Cart.findById({user:userId})

    if(!cart){
       throw new AppError("Cart not found",404)
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId)

    await cart.save();

    const populateCart = await cart.populate("items.product", "name price image category")

    return successResponse(res,200, "item removed from cart",populateCart)
})


export const updateCartItem = asyncHandler(async(req,res) =>{
    const userId = req.user._id

    const {productId, quantity} = req.body

    const cart = await Cart.find({user:userId})

    if(!cart){
        throw new AppError("Cart not found",404)
    }

    const item = cart.items((items) => item.product.toString() === userId.toString())

    if(!item){
        throw new AppError("Product not found in cart",404)
    }

    item.quantity = quantity;

    await cart.save()

    const populatedCart = await cart.populate("items.product", "name price image category")

    return successResponse(res,200, "Cart Updated successfully",populatedCart)
})


export const getCart = asyncHandler(async(req,res) =>{
    const userId = req.user._id

    const cart = await Cart.findOne({user:userId}).populate("items.product", "name price image category")

    if(!cart || cart.items.length === 0){
        return successResponse(res,200,"Cart is empty",{items:[]})
    }
    
    return successResponse(res,200, "cart fetched successfully",cart)

})