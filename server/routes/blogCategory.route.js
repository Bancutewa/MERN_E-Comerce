const blogCategoryRouter = require("express").Router()
const blogCategoryController = require("../controllers/blogCategory.controller")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")

blogCategoryRouter.post("/", [verifyAccessToken, isAdmin], blogCategoryController.createBlogCategory)
blogCategoryRouter.get("/", blogCategoryController.getBlogCategories)
blogCategoryRouter.put("/:bcid", [verifyAccessToken, isAdmin], blogCategoryController.updateBlogCategory)
blogCategoryRouter.delete("/:bcid", [verifyAccessToken, isAdmin], blogCategoryController.deleteBlogCategory)

module.exports = blogCategoryRouter

