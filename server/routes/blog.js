const router = require('express').Router()
const { createBlog, updateBlog, getBlogs, likeBlog, dislikeBlog, getBlog, deleteBlog } = require('../controllers/blog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.get('/', getBlogs)

router.get('/one/:bid', getBlog)

router.post('/', [verifyAccessToken, isAdmin], createBlog)

router.put('/like/:bid', verifyAccessToken, likeBlog)

router.put('/dislike/:bid', verifyAccessToken, dislikeBlog)

router.put('/:bid', [verifyAccessToken, isAdmin], updateBlog)

router.delete('/:bid', [verifyAccessToken, isAdmin], deleteBlog)

module.exports = router