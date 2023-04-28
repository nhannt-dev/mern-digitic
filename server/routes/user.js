const router = require('express').Router()
const { register, finalregister, login, getCurrent, refreshAccessToken, logout, forgotPassword, resetPassword, getUsers, deleteUser, updateUser, updateUserByAdmin, updateUserAddress, updateCart } = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/register', register)

router.get('/finalregister/:token', finalregister)

router.post('/login', login)

router.get('/current', verifyAccessToken, getCurrent)

router.post('/refreshtoken', refreshAccessToken)

router.get('/logout', logout)

router.post('/forgotpassword', forgotPassword)

router.put('/resetpassword', resetPassword)

router.get('/', [verifyAccessToken, isAdmin], getUsers)

router.delete('/', [verifyAccessToken, isAdmin], deleteUser)

router.put('/current', [verifyAccessToken], updateUser)

router.put('/address', [verifyAccessToken], updateUserAddress)

router.put('/cart', verifyAccessToken, updateCart)

router.put('/:uid', [verifyAccessToken, isAdmin], updateUserByAdmin)

module.exports = router