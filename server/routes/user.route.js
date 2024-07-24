const userRouter = require("express").Router()
const userController = require("../controllers/user.controller")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")

userRouter.post(("/login"), userController.login)
userRouter.post(("/register"), userController.register)
userRouter.get(("/current"), verifyAccessToken, userController.getCurrent)
userRouter.post(("/refreshtoken"), userController.refreshAccessToken)
userRouter.get(("/logout"), userController.logout)
userRouter.get(("/forgotpassword"), userController.forgotPassword)
userRouter.put(("/reset-password"), userController.resetPassword)
userRouter.get(("/"), verifyAccessToken, isAdmin, userController.getUsers)
userRouter.delete(("/"), verifyAccessToken, isAdmin, userController.deleteUser)
userRouter.put(("/current"), verifyAccessToken, userController.updateUser)
userRouter.put(("/:uid"), verifyAccessToken, isAdmin, userController.updateUserByAdmin)

module.exports = userRouter

