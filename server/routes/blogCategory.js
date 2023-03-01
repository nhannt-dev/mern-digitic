const router = require('express').Router()
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/blogCategory')

router.post('/', createCategory)

router.get('/', getCategories)

router.put('/:bcid', updateCategory)

router.delete('/:bcid', deleteCategory)


module.exports = router