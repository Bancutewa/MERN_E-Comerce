const productRouter = require("express").Router()
const productController = require("../controllers/product.controller")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")
const uploadCloud = require("../config/cloundinary.config")

// productRouter.post(("/"), [verifyAccessToken, isAdmin], productController.createProduct)
// productRouter.get(("/"), [verifyAccessToken, isAdmin], productController.getProducts)
// productRouter.put(("/ratings"), [verifyAccessToken], productController.ratings)

// productRouter.put(("/uploadimage/:pid"), [verifyAccessToken, isAdmin], uploadCloud.array('images', 10), productController.uploadImageProduct)
// productRouter.put(("/:pid"), [verifyAccessToken, isAdmin], productController.updateProduct)
// productRouter.delete(("/:pid"), [verifyAccessToken, isAdmin], productController.deleteProduct)
// productRouter.get(("/:pid"), productController.getProduct)


productRouter.post(("/"), productController.createProduct)
productRouter.get(("/"), productController.getProducts)
productRouter.put(("/ratings"), [verifyAccessToken], productController.ratings)

productRouter.put(("/uploadimage/:pid"), uploadCloud.array('images', 10), productController.uploadImageProduct)
productRouter.put(("/:pid"), productController.updateProduct)
productRouter.delete(("/:pid"), productController.deleteProduct)
productRouter.get(("/:pid"), productController.getProduct)

module.exports = productRouter

