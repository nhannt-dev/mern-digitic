const router = require('express').Router()
const { createBrand, deleteBrand, getBrands, updateBrand } = require('../controllers/brand')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], createBrand)

router.get('/', getBrands)

router.put('/:bid', [verifyAccessToken, isAdmin], updateBrand)

router.delete('/:bid', [verifyAccessToken, isAdmin], deleteBrand)

module.exports = router