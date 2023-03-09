const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

exports.createCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body
    if (!name || !discount || !expiry) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    const response = await Coupon.create({
        ...req.body,
        expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000
    })
    return res.json({
        success: response ? true : false,
        createCoupon: response ? response : 'Có lỗi trong việc tạo mã ưu đãi!'
    })
})

exports.getCoupons = asyncHandler(async (req, res) => {
    const excludes = '-createdAt -updatedAt'
    const response = await Coupon.find().select(excludes)
    return res.json({
        success: response ? true : false,
        coupons: response ? response : 'Có lỗi trong việc xem danh sách mã ưu đãi!'
    })
})

exports.updateCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    if (req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000
    const response = await Coupon.findByIdAndUpdate(cid, req.body, { new: true })
    return res.json({
        success: response ? true : false,
        updatedCoupon: response ? response : 'Có lỗi trong việc cập nhật mã ưu đãi!'
    })
})

exports.deleteCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params
    const response = await Coupon.findByIdAndDelete(cid)
    return res.json({
        success: response ? true : false,
        deletedCoupon: response ? response : 'Có lỗi trong việc xóa mã ưu đãi!'
    })
})