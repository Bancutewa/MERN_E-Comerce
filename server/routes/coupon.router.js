const couponRouter = require('express').Router()
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")
const couponController = require("../controllers/coupon.controller")


couponRouter.post('/', [verifyAccessToken, isAdmin], couponController.createCoupon)
couponRouter.get('/', couponController.getCoupons)
couponRouter.put('/:cid', [verifyAccessToken, isAdmin], couponController.updateCoupon)
couponRouter.delete('/:cid', couponController.deleteCoupon)



module.exports = couponRouter