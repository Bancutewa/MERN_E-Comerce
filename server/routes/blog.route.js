const blogRouter = require('express').Router()
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")
const blogController = require("../controllers/blog.controller")


blogRouter.get('/', blogController.getBlogs)
blogRouter.post('/', [verifyAccessToken, isAdmin], blogController.createBlog)
blogRouter.post('/like', [verifyAccessToken], blogController.likeBlog)
blogRouter.put('/:bid', [verifyAccessToken, isAdmin], blogController.updateBlog)


module.exports = blogRouter