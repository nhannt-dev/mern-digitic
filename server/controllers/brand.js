const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler')

exports.createBrand = asyncHandler(async (req, res) => {
    const response = await Brand.create(req.body)
    return res.json({
        success: response ? true : false,
        createdBrand: response ? response : 'Không thể tạo thương hiệu!'
    })
})

exports.getBrands = asyncHandler(async (req, res) => {
    const response = await Brand.find()
    return res.json({
        success: response ? true : false,
        brands: response ? response : 'Không thể xem danh sách thương hiệu'
    })
})

exports.updateBrand = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const response = await Brand.findByIdAndUpdate(bid, req.body, { new: true })
    return res.json({
        success: response ? true : false,
        updatedBrand: response ? response : 'Không thể cập nhật thương hiệu!'
    })
})

exports.deleteBrand = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const response = await Brand.findByIdAndDelete(bid)
    return res.json({
        success: response ? true : false,
        deletedBrand: response ? response : 'Không thể xóa thương hiệu!'
    })
})