const mongoose = require("mongoose")

const postSchema = mongoose.Schema({

    title:{
        type:String,
        required: true
    },

    description: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    brand: {
        type: String,
        required: true,
    },

    condition: {
        type: String,
        required: true,
    },

    sold: {
        type: Boolean,
        default: false
    },

    image:{
        public_id:String,
        url:String
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    purchaseRequest:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },

})

module.exports = mongoose.model("Post",postSchema)