const { insertProduct, insertCategory } = require('../controllers/insert')

const router = require('express').Router()

router.post('/product', insertProduct)

router.post('/cate', insertCategory)

module.exports = router