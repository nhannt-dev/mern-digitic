const router = require('express').Router()
const { createBlog, updateBlog, getBlogs, likeBlog } = require('../controllers/blog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.get('/', getBlogs)

router.post('/', [verifyAccessToken, isAdmin], createBlog)

router.put('/like', verifyAccessToken, likeBlog)

router.put('/:bid', [verifyAccessToken, isAdmin], updateBlog)

module.exports = router