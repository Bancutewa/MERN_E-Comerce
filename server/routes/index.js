const { notFound, errHandler } = require("../middlewares/errHandler.middleware")
const userRouter = require("./user.route")
const productRouter = require("./product.route")
const productCategoryRouter = require("./productCategory.route")
const blogRouter = require("./blog.route")
const blogCategoryRouter = require("./blogCategory.route")
const initRoutes = (app) => {
    app.use("/api/v1/user", userRouter)
    app.use("/api/v1/product", productRouter)
    app.use("/api/v1/blog", blogRouter)
    app.use("/api/v1/productcategory", productCategoryRouter)
    app.use("/api/v1/blogcategory", blogCategoryRouter)

    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes