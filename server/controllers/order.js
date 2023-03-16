const Order = require('../models/order')
const User = require('../models/user')
const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

exports.createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { coupon } = req.body
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
    const products = userCart?.cart?.map(el => ({
        product: el.product._id,
        count: el.quantity,
        color: el.color
    }))
    let total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum, 0)
    const createData = { products, total, orderBy: _id }
    if (coupon) {
        const seletedCoupon = await Coupon.findById(coupon)
        total = Math.round(total * (1 - +seletedCoupon?.discount / 100) / 1000) * 1000 || total
        createData.total = total
        createData.coupon = coupon
    }
    const rs = await Order.create(createData)
    return res.json({
        success: rs ? true : false,
        rs: rs ? rs : 'Có lỗi trong quá trình tạo đơn hàng!'
    })
})

exports.updateStatus = asyncHandler(async (req, res) => {
    const { oid } = req.params
    const { status } = req.body
    if (!status) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    const response = await Order.findByIdAndUpdate(oid, { status }, { new: true })
    return res.json({
        success: true,
        response: response ? response : 'Có lỗi trong việc cập nhật trạng thái đơn hàng!'
    })
})

exports.getUserOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const response = await Order.find({ orderBy: _id })
    return res.json({
        success: response ? true : false,
        response: response ? response : 'Không thể xem lịch sử đơn hàng!'
    })
})

exports.getOrders = asyncHandler(async (req, res) => {
    const response = await Order.find()
    return res.json({
        success: response ? true : false,
        response: response ? response : 'Không thể xem danh sách đơn hàng!'
    })
})