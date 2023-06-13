const Blog = require('../models/blog')
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
    const { bid } = req.params
    if (!bid) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    const isLiked = blog?.likes?.find(el => el.toString() === _id)
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
})

exports.dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    const blog = await Blog.findById(bid)
    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id)
    if (alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    const isDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if (isDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
})

exports.getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const excludes = '-email -mobile -cart -address -wishlist -isBlocked -refreshToken -password -role -createdAt -updatedAt'
    const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true }).populate('likes', excludes).populate('dislikes', excludes)
    return res.json({
        success: blog ? true : false,
        rs: blog
    })
})

exports.deleteBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const blog = await Blog.findByIdAndDelete(bid)
    return res.json({
        success: blog ? true : false,
        deletedBlog: blog || 'Có lỗi trong quá trình xóa blog'
    })
})

exports.uploadImagesBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (!req.file) throw new Error('Vui lòng tải lên ít nhất 1 hoặc 3 ảnh sản phẩm')
    const response = await Blog.findByIdAndUpdate(bid, { image: req.file.path }, { new: true })
    return res.status(200).json({
        status: true,
        updatedBlog: response ? response : 'Không thể tải ảnh blog lên hệ thống!'
    })
})