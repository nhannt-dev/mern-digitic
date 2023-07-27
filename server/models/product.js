const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types
const { model } = mongoose

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: Array,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    thumb: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    color: {
        type: String
    },
    ratings: [
        {
            star: { type: Number },
            postedBy: { type: ObjectId, ref: 'User' },
            comment: { type: String },
            updatedAt: { type: Date }
        }
    ],
    totalRatings: {
        type: Number,
        default: 0
    },
    variants: [
        {
            color: String,
            price: Number,
            thumb: String,
            images: Array
        }
    ]
}, {
    timestamps: true
})

module.exports = model('Product', productSchema)