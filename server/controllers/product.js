const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const { unsignedConverter } = require('../ultils/unsignedConverter')

exports.createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    if (req.body && req.body.title) {
        let unsigned = unsignedConverter(req.body.title)
        req.body.slug = slugify(unsigned)
    }
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : 'Không thể tạo sản phẩm'
    })
})
exports.getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Không thể xem sản phẩm'
    })
})
// Filtering, sorting & pagination
exports.getProducts = asyncHandler(async (req, res) => {
    const queries = {...req.query}
    const excludeFields = ["page", "sort", "limit", "fields"] //Phân tách cách trường ra khỏi query
    excludeFields.forEach((el) => delete queries[el])
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    const formattedQueries = JSON.parse(queryString)
    if (queries?.title) formattedQueries.title = { $regex: queries.title, $options: 'i' }
    let queryCommand = Product.find(formattedQueries)
    if (req.query.sort) { //localhost:5000/api/product/sort=-price -> Sắp sếp giảm dần ngược lại tăng dần
        const sortBy = req.query.sort.split(",").join(" ")
        queryCommand = queryCommand.sort(sortBy)
    }
    //http://localhost:4000/api/product?title=1TB&fields=-slug, -description
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(" ")
        queryCommand = queryCommand.select(fields)
    }

    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)

    queryCommand.exec(async (err, response) => {
        if(err) throw new Error(err.message)
        const counts = await Product.find(formattedQueries).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            counts,
            products: response ? response : 'Không thể xem danh sách sản phẩm'
        })
    })
})
exports.updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct ? updatedProduct : 'Không thể cập nhật sản phẩm'
    })
})
exports.deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? deletedProduct : 'Không thể xóa sản phẩm'
    })
})

exports.ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { star, pid, comment } = req.body
    if (!star || !pid) throw new Error('Vui lòng nhập đầy đủ thông tin!')
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id)
    if (alreadyRating) {
        await Product.updateOne({
            ratings: {$elemMatch: alreadyRating}
        }, {
            $set: { 'ratings.$.star': star, 'ratings.$.comment': comment }
        }, { new: true })
    } else {
        await Product.findByIdAndUpdate(pid, {
            $push: { ratings: { star, comment, postedBy: _id } }
        }, { new: true })
    }
    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRating = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0)
    updatedProduct.totalRatings = Math.round(sumRating * 10 / ratingCount) / 10
    await updatedProduct.save()
    return res.status(200).json({
        status: true,
        updatedProduct
    })
})