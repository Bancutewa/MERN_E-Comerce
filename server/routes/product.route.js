const productRouter = require("express").Router()
const productController = require("../controllers/product.controller")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")
const uploadCloud = require("../config/cloundinary.config")

productRouter.post(("/"), [verifyAccessToken, isAdmin], productController.createProduct)
productRouter.get(("/"), [verifyAccessToken, isAdmin], productController.getProducts)
productRouter.put(("/ratings"), [verifyAccessToken], productController.ratings)

productRouter.put(("/uploadimage/:pid"), [verifyAccessToken, isAdmin], uploadCloud.single('images'), productController.uploadImageProduct)
productRouter.put(("/:pid"), [verifyAccessToken, isAdmin], productController.updateProduct)
productRouter.delete(("/:pid"), [verifyAccessToken, isAdmin], productController.deleteProduct)
productRouter.get(("/:pid"), productController.getProduct)

module.exports = productRouter

