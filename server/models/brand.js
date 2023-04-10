const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

const brandSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, { timestamps: true }
)

module.exports = mongoose.model('Brand', brandSchema)