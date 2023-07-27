const mongoose = require('mongoose')

const { model } = mongoose

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    discount: {
        type: Number,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Coupon', couponSchema)