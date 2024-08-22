const productCategoryRouter = require("express").Router()
const productCategoryController = require("../controllers/productCategory.controller")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")

productCategoryRouter.post("/", [verifyAccessToken, isAdmin], productCategoryController.createCategory)
productCategoryRouter.get("/", productCategoryController.getCategories)
productCategoryRouter.put("/:pcid", [verifyAccessToken, isAdmin], productCategoryController.updateCategory)
productCategoryRouter.delete("/:pcid", [verifyAccessToken, isAdmin], productCategoryController.deleteCategory)

module.exports = productCategoryRouter

