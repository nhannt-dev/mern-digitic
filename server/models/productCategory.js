const mongoose = require('mongoose')

const { model } = mongoose

const productCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    brand: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('ProductCategory', productCategorySchema)