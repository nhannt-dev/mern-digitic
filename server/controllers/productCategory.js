const ProductCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')

exports.createCategory = asyncHandler(async (req, res) => {
    const response = await ProductCategory.create(req.body)
    return res.json({
        status: response ? true : false,
        createCategory: response ? response : 'Có lỗi trong việc tạo danh mục sản phẩm!'
    })
})

exports.getCategories = asyncHandler(async (req, res) => {
    const response = await ProductCategory.find().select('_id title')
    return res.json({
        status: response ? true : false,
        prodCategories: response ? response : 'Có lỗi trong việc xem toàn bộ danh mục sản phẩm!'
    })
})

exports.updateCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params
    const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, { new: true })
    return res.json({
        status: response ? true : false,
        updatedprodCategory: response ? response : 'Có lỗi trong việc cập nhật danh mục sản phẩm!'
    })
})

exports.deleteCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params
    const response = await ProductCategory.findByIdAndDelete(pcid)
    return res.json({
        status: response ? true : false,
        deletedprodCategory: response ? response : 'Có lỗi trong việc xóa danh mục sản phẩm!'
    })
})