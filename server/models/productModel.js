import mongoose from 'mongoose'
const {Schema, model} = mongoose

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    
    category:{
        type:String,
        required:true
    },

    images:[
        {
            type:String
        }
    ],

    price:{
        type:Number,
        required:true,
        min:0
    },

    stock:{
        type:Number,
        required:true,
        min:0,
        default:0
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seller",
    },

    isArchived:{
        type:Boolean,
        default:false
    }
}, {
    timestamps:true
})

export default model("Product", productSchema)