const userRouter = require("./user.route")
const productRouter = require("./product.route")
const { notFound, errHandler } = require("../middlewares/errHandler.middleware")
const initRoutes = (app) => {
    app.use("/api/v1/user", userRouter)
    app.use("/api/v1/product", productRouter)

    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes