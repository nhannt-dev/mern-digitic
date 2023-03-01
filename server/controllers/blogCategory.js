const BlogCategory = require('../models/blogCategory')
const asyncHandler = require('express-async-handler')

exports.createCategory = asyncHandler(async (req, res) => {
    const response = await BlogCategory.create(req.body)
    return res.json({
        status: response ? true : false,
        createCategory: response ? response : 'Có lỗi trong việc tạo danh mục blog!'
    })
})

exports.getCategories = asyncHandler(async (req, res) => {
    const response = await BlogCategory.find().select('_id title')
    return res.json({
        status: response ? true : false,
        blogCategories: response ? response : 'Có lỗi trong việc xem toàn bộ danh mục blog!'
    })
})

exports.updateCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params
    const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, { new: true })
    return res.json({
        status: response ? true : false,
        updatedblogCategory: response ? response : 'Có lỗi trong việc cập nhật danh mục blog!'
    })
})

exports.deleteCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params
    const response = await BlogCategory.findByIdAndDelete(bcid)
    return res.json({
        status: response ? true : false,
        deletedblogCategory: response ? response : 'Có lỗi trong việc xóa danh mục blog!'
    })
})