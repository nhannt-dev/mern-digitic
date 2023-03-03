const Blog = require('../models/Blog')
const asyncHandler = require('express-async-handler')

exports.createBlog = asyncHandler(async (req, res) => {
    const { title, category, description } = req.body
    const response = await Blog.create(req.body)
    if (!title || !category || !description) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    return res.json({
        status: response ? true : false,
        createdBlog: response ? response : 'Không thể tạo blog!'
    })
})

exports.updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true })
    return res.json({
        status: response ? true : false,
        updatedBlog: response ? response : 'Không thể cập nhật blog!'
    })
})

exports.getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find()
    return res.json({
        status: response ? true : false,
        getBlogs: response ? response : 'Không thể xem danh sách blog!'
    })
})

exports.likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.body
    if(!bid) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    const isLiked = blog?.likes?.find(el => el.toString() === _id)
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}}, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, {$push: {likes: _id}}, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
})