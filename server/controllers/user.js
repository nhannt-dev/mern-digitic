const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/sendMail')
const crypto = require('crypto')
const uniqToken = require('uniqid')

exports.register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body
    if (!email || !password || !lastname || !firstname || !mobile) {
        return res.status(400).json({
            success: false,
            mes: 'Vui lòng nhập đầy đủ thông tin!'
        })
    }
    const user = await User.findOne({ email })
    if (user) throw new Error('Người dùng đã tồn tại')
    else {
        const token = uniqToken()
        const emailHash = email + '@' + token
        const newUser = await User.create({ email: emailHash, password, firstname, lastname, mobile })
        if (newUser) {
            const html = `
                <h2>Mã đăng ký của bạn là: </h2><br/>
                <blockquote>
                    <strong>${token}</strong>
                </blockquote>
            `
            await sendMail({ email, html, subject: 'Hoàn tất xác thực đăng ký' })
        }
        setTimeout(async () => {
            await User.deleteOne({ email: emailHash })
        }, [900000])
        return res.json({
            success: newUser ? true : false,
            mes: newUser ? 'Vui lòng kiểm tra email của bạn' : 'Có lỗi trong quá trình thao tác'
        })
    }
})

exports.finalregister = asyncHandler(async (req, res) => {
    const { token } = req.params
    const notActivedEmail = await User.findOne({ email: new RegExp(`${token}$`) })
    if (notActivedEmail) {
        notActivedEmail.email = Buffer(notActivedEmail?.email?.split('@')[0]).toString()
        notActivedEmail.save()
    }
    return res.json({
        success: notActivedEmail ? true : false,
        mes: notActivedEmail ? 'Đăng ký thành công. Vui lòng đăng nhập.' : 'Có lỗi trong quá trình thao tác!'
    })
})

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({
            success: false,
            mes: 'Vui lòng nhập đầy đủ thông tin!'
        })
    const response = await User.findOne({ email })
    if (response && await response.isCorrectPassword(password)) {
        const { password, role, refreshToken, ...userData } = response.toObject()
        const accessToken = generateAccessToken(response._id, role)
        const newRefreshToken = generateRefreshToken(response._id)
        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true })
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    } else {
        throw new Error('Người dùng không hợp lệ!')
    }
})

exports.getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password')
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'Người dùng không tồn tại'
    })
})

exports.refreshAccessToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie && !cookie.refreshToken) throw new Error('Refresh token không có trong cookies')
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken })
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token không khớp'
    })
})

exports.logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) throw new Error('Refresh token không có trong cookies')
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        mes: 'Đăng xuất thành công'
    })
})

exports.forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) throw new Error('Vui lòng nhập email')
    const user = await User.findOne({ email })
    if (!user) throw new Error('Người dùng không tồn tại')
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`

    const data = {
        email,
        html,
        subject: 'Quên mật khẩu'
    }
    await sendMail(data)
    return res.status(200).json({
        success: true,
        mes: 'Vui lòng kiểm tra email của bạn!'
    })
})

exports.resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) throw new Error('Reset token không hợp lệ')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Thay đổi mật khẩu thành công' : 'Có lỗi trong quá trình thao tác'
    })
})

exports.getUsers = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    const excludeFields = ["page", "sort", "limit", "fields"]
    excludeFields.forEach((el) => delete queries[el])
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    const formattedQueries = JSON.parse(queryString)
    if (queries?.name) formattedQueries.name = { $regex: queries.name, $options: 'i' }

    if (req.query.q) {
        delete formattedQueries.q
        formattedQueries['$or'] = [
            { mobile: { $regex: queries.q, $options: 'i' } },
            { email: { $regex: queries.q, $options: 'i' } }
        ]
    }
    console.log(formattedQueries)
    let queryCommand = User.find(formattedQueries)

    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ")
        queryCommand = queryCommand.sort(sortBy)
    }

    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(" ")
        queryCommand = queryCommand.select(fields)
    }

    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)

    queryCommand.exec(async (err, response) => {
        if (err) throw new Error(err.message)
        const counts = await User.find(formattedQueries).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            counts,
            users: response ? response : 'Không thể xem danh sách người dùng'
        })
    })
})

exports.deleteUser = asyncHandler(async (req, res) => {
    const { uid } = req.params
    const response = await User.findByIdAndDelete(uid)
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? `Đã xóa người dùng ${response.email} thành công` : 'Không có người dùng để xóa'
    })
})

exports.updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Có lỗi trong quá trình thao tác'
    })
})

exports.updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Có lỗi trong quá trình thao tác'
    })
})

exports.updateUserAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!req.body.address) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address } }, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Có lỗi trong việc cập nhật địa chỉ người dùng!'
    })
})

exports.updateCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { pid, quantity, color } = req.body
    if (!pid || !quantity || !color) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    const user = await User.findById(_id).select('cart')
    const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid)
    if (alreadyProduct) {
        if (alreadyProduct.color === color) {
            const response = await User.updateOne({ cart: { $elemMatch: alreadyProduct } }, { $set: { 'cart.$.quantity': quantity } }, { new: true })
            return res.json({
                success: response ? true : false,
                updatedUser: response ? response : 'Có lỗi trong quá trình thêm sản phẩm vào giỏ hàng!'
            })
        } else {
            const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color } } }, { new: true })
            return res.json({
                success: response ? true : false,
                updatedUser: response ? response : 'Có lỗi trong quá trình thêm sản phẩm vào giỏ hàng!'
            })
        }
    } else {
        const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color } } }, { new: true })
        return res.json({
            success: response ? true : false,
            updateUser: response ? response : 'Có lỗi trong quá trình thêm sản phẩm vào giỏ hàng!'
        })
    }
})