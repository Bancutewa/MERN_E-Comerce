const userRouter = require("express").Router()
const userController = require("../controllers/user.controller")

userRouter.post(("/register"), userController.register)

module.exports = userRouter

