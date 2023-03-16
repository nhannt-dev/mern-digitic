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
    status: {
        type: String,
        default: 'Processing',
        enum: ['Cancelled', 'Processing', 'Delivering', 'Succeed'],
    },
    total: Number,
    coupon: {
        type: ObjectId,
        ref: 'Coupon'
    },
    orderBy: {
        type: ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Order', orderSchema)