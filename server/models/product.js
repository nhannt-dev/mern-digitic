const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

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
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)