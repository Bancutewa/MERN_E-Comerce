const { notFound, errHandler } = require("../middlewares/errHandler.middleware")
const userRouter = require("./user.route")
const productRouter = require("./product.route")
const productCategoryRouter = require("./productCategory.route")
const blogRouter = require("./blog.route")
const blogCategoryRouter = require("./blogCategory.route")
const brandRouter = require("./brand.route")
const couponRouter = require("./coupon.router")
const OrderRouter = require("./order.route")
const InsertRouter = require("./insert.router")
const initRoutes = (app) => {
    app.use("/api/v1/user", userRouter)
    app.use("/api/v1/product", productRouter)
    app.use("/api/v1/blog", blogRouter)
    app.use("/api/v1/productcategory", productCategoryRouter)
    app.use("/api/v1/blogcategory", blogCategoryRouter)
    app.use("/api/v1/brand", brandRouter)
    app.use("/api/v1/coupon", couponRouter)
    app.use("/api/v1/order", OrderRouter)
    app.use("/api/v1/insert", InsertRouter)

    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes