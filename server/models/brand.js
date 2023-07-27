const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types
const { model } = mongoose

const brandSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, { timestamps: true }
)

module.exports = model('Brand', brandSchema)