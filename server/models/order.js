const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: ObjectId,
                ref: 'Product'
            },
            count: Number,
            color: String
        }
    ],
    status:{
        type: String,
        default: 'Processing',
        enum: ['Cancelled', 'Processing', 'Successed'],
    },
    paymentIntent:{},
    orderBy:{
        type: ObjectId,
        ref: 'User'
    },
    password:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Order', orderSchema)