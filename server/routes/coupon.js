const router = require('express').Router()
const { isAdmin, verifyAccessToken } = require('../middlewares/verifyToken')
const { createCoupon, getCoupons, updateCoupon, deleteCoupon } = require('../controllers/coupon')

router.post('/', [verifyAccessToken, isAdmin], createCoupon)

router.put('/:cid', [verifyAccessToken, isAdmin], updateCoupon)

router.get('/', getCoupons)

router.delete('/:cid', [verifyAccessToken, isAdmin], deleteCoupon)

module.exports = router