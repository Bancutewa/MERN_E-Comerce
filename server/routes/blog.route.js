const blogRouter = require('express').Router()
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")
const blogController = require("../controllers/blog.controller")
const uploadCloud = require("../config/cloundinary.config")

blogRouter.get('/', blogController.getBlogs)
blogRouter.get('/one/:bid', blogController.getBlog)
blogRouter.post('/', [verifyAccessToken, isAdmin], blogController.createBlog)
blogRouter.put('/uploadimage/:bid', [verifyAccessToken, isAdmin], uploadCloud.single("image"), blogController.uploadImageBlog)
blogRouter.put('/like/:bid', [verifyAccessToken], blogController.likeBlog)
blogRouter.put('/dislike/:bid', [verifyAccessToken], blogController.dislikeBlog)
blogRouter.put('/:bid', [verifyAccessToken, isAdmin], blogController.updateBlog)
blogRouter.delete('/:bid', [verifyAccessToken, isAdmin], blogController.deleteBlog)


module.exports = blogRouter