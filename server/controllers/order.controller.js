const Order = require('../models/order.model')
const User = require('../models/user.model')
const Coupon = require('../models/coupon.model')
const asyncHandler = require("express-async-handler")


const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { coupon } = req.body
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
    const products = userCart?.cart?.map(product => ({
        product: product.product._id,
        count: product.quantity,
        color: product.color
    }))
    let total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum, 0)
    const createData = { products: products, total, orderBy: _id, coupon }
    if (coupon) {
        const couponData = await Coupon.findById(coupon)
        total = Math.round(total * (1 - couponData?.discount / 100) / 1000) * 1000
        createData.total = total
        createData.coupon = coupon
    }
    const response = await Order.create(createData)
    return res.json({
        success: response ? true : false,
        response: response ? response : "Cannot create new Order"
    })
})

const updateOrder = asyncHandler(async (req, res) => {
    const { oid } = req.params
    const { status } = req.body
    console.log(status);

    if (!status) throw new Error("Missing status")
    const response = await Order.findByIdAndUpdate(oid, { status }, { new: true })
    return res.json({
        success: response ? true : false,
        response: response ? response : "Cannot update Order"
    })
})

const getOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const response = await Order.find({ orderBy: _id })
    return res.json({
        success: response ? true : false,
        response: response ? response : "Cannot get Order"
    })
})
module.exports = {
    createOrder,
    updateOrder,
    getOrder
}