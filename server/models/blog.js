const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: ObjectId,
        ref: 'BlogCategory',
        required: true
    },
    numberViews: {
        type: String,
        default: 0
    },
    likes: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    dislikes: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    image: {
        type: String,
        default: 'https://document-export.canva.com/nFKQ0/DAFb9xnFKQ0/10/thumbnail/0001.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWDTJW6UD%2F20230302%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230302T203554Z&X-Amz-Expires=26073&X-Amz-Signature=f72975e0c395a150e62cf4ec48785ca4b8198c4e8a82f0ac193500ce1f92b6e0&X-Amz-SignedHeaders=host&response-expires=Fri%2C%2003%20Mar%202023%2003%3A50%3A27%20GMT'
    },
    author: {
        type: String,
        default: 'Admin'
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model('Blog', blogSchema)