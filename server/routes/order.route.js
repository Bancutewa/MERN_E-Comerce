const OrderRouter = require("express").Router()
const OrderController = require("../controllers/order.controller")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")

OrderRouter.get("/", [verifyAccessToken], OrderController.getOrder)
OrderRouter.post("/", [verifyAccessToken], OrderController.createOrder)
OrderRouter.put("/status/:oid", [verifyAccessToken, isAdmin], OrderController.updateOrder)

module.exports = OrderRouter

