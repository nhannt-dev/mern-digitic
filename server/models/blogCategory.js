const mongoose = require('mongoose')

const { model } = mongoose

const blogCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
}, {
    timestamps: true
})

module.exports = model('BlogCategory', blogCategorySchema)