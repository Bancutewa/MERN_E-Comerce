const userRouter = require("./user.route")
const { notFound, errHandler } = require("../middlewares/errHandler.middleware")
const initRoutes = (app) => {
    app.use("/api/v1/user", userRouter)

    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes