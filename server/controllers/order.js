const Order = require('../models/order')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

exports.createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const userCart = await User.findById(_id).select('cart')
    return res.json({
        success: userCart ? true : false,
        createdOrder: userCart ? userCart : 'Có lỗi trong quá trình tạo đơn hàng!'
    })
})