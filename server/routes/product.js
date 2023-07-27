const router = require('express').Router()
const { createProduct, getProducts, ratings, updateProduct, deleteProduct, getProduct, uploadImagesProduct, createVariants } = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary')

router.post('/', [verifyAccessToken, isAdmin], uploader.fields([{ name: 'images', maxCount: 10 }, { name: 'thumb', maxCount: 1 }]), createProduct)

router.get('/', getProducts)

router.put('/ratings', verifyAccessToken, ratings)

router.put('/variants/:pid', [verifyAccessToken, isAdmin], uploader.fields([{ name: 'images', maxCount: 10 }, { name: 'thumb', maxCount: 1 }]), createVariants)

router.put('/:pid', [verifyAccessToken, isAdmin], uploader.fields([{ name: 'images', maxCount: 10 }, { name: 'thumb', maxCount: 1 }]), updateProduct)

router.put('/uploadimage/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 3), uploadImagesProduct)

router.delete('/:pid', [verifyAccessToken, isAdmin], deleteProduct)

router.get('/:pid', getProduct)

module.exports = router