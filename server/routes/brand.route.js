const brandRouter = require("express").Router()
const brandController = require("../controllers/brand.controller")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")

brandRouter.post("/", [verifyAccessToken, isAdmin], brandController.createBrand)

module.exports = brandRouter

