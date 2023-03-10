const router = require('express').Router()
const { createProduct, getProducts, ratings, updateProduct, deleteProduct, getProduct, uploadImagesProduct } = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary')

router.post('/', [verifyAccessToken, isAdmin], createProduct)

router.get('/', getProducts)

router.put('/ratings', verifyAccessToken, ratings)

router.put('/:pid', [verifyAccessToken, isAdmin], updateProduct)

router.put('/uploadimage/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 3), uploadImagesProduct)

router.delete('/:pid', [verifyAccessToken, isAdmin], deleteProduct)

router.get('/:pid', getProduct)

module.exports = router