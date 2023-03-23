const Product = require('../models/product')
const ProductCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')
const data = require('../../scrape/ecommerce.json')
const slugify = require('slugify')
const { catgoryData } = require('../../scrape/cate_brand')

const fn = async (product) => {
    await Product.create({
        title: product?.name,
        slug: slugify(product?.name) + Math.round(Math.random() * 100) + '',
        description: product?.description,
        brand: product?.brand,
        price: Math.round(Number(product?.price?.match(/\d/g).join('')) / 100),
        category: product?.category[1],
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 100),
        images: product?.images,
        color: product?.variants?.find(el => el.label === 'Color')?.variants[0]
    })
}

exports.insertProduct = asyncHandler(async (req, res) => {
    const promises = []
    for(let cate of data) promises.push(fn(cate))
    await Promise.all(promises)
    return res.status(200).json('Ghi dữ liệu thành công!')
})

const fn2 = async (cate) => {
    await ProductCategory.create({
        title: cate?.cate,
        brand: cate?.brand
    })
}

exports.insertCategory = asyncHandler(async (req, res) => {
    const promises = []
    for(let product of catgoryData) promises.push(fn2(product))
    await Promise.all(promises)
    return res.status(200).json('Ghi dữ liệu thành công!')
})