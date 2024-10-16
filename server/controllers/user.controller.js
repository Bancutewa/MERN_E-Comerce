const User = require("../models/user.model")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const { generateAccessToken, generateRefreshToken } = require("../middlewares/jwt.middleware")
const { sendMail } = require("../utils/sendMail.utils")
const crypto = require('crypto')


const register = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, mobile } = req.body
    if (!email || !password || !firstName || !lastName || !mobile)
        return res.status(400).json({
            success: false,
            message: "Missing Inputs"
        })

    const user = await User.findOne({ email })
    if (user) {
        throw new Error("User has existed!")
    } else {
        const newUser = await User.create(req.body)

        return res.status(201).json({
            success: newUser ? true : false,
            message: newUser ? "Register is successfully. Please go Login" : "Something went wrong"
        })
    }

})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({
            success: false,
            message: "Missing Inputs"
        })

    const response = await User.findOne({ email })

    if (email && await response.isCorrectPassword(password)) {
        const { password, role, refreshToken, ...userData } = response.toObject()

        // Xac Thuc
        const accessToken = generateAccessToken(userData._id, role)
        const newRefreshToken = generateRefreshToken(userData._id)
        await User.findByIdAndUpdate(userData._id, { refreshToken: newRefreshToken }, { new: true })
        res.cookie("refreshToken", newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })

        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    } else {
        throw new Error(`Invalid credentials!`)
    }

})

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select("-refreshToken -password-role")
    return res.status(200).json({
        success: user ? true : false,
        response: user ? user : "User not found"
    })

})
const refreshAccessToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie && !cookie.refreshToken) throw new Error("No refresh token in cookies")
    const decode = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({ _id: decode._id, refreshToken: cookie.refreshToken })
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : "Refresh token not matched"
    }
    )
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie && !cookie.refreshToken) throw new Error("No refresh token in cookies")
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: "" }, { new: true })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        message: "Logout is done"
    })
})
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query
    if (!email) throw new Error('Missing email')
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found')
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ.
     <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`

    const data = {
        email,
        html
    }
    const rs = await sendMail(data)
    return res.status(200).json({
        success: true,
        rs
    })
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    // Giai ma token dc duoc gui
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) throw new Error("Invalid reset token")
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        message: user ? 'updated password' : 'Sth went wrong'
    })
})


const getUsers = asyncHandler(async (req, res) => {
    const response = await User.find().select("-refreshToken -password -role")
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})


const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query
    if (!_id) throw new Error("Missing input")
    const response = await User.findByIdAndDelete(_id).select("-refreshToken -password -role")
    return res.status(200).json({
        success: response ? true : false,
        deleteUser: response ? `User with email ${response.email} deleted` : `Delete user ${response.email} fail`
    })
})
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!_id || Object.keys(req.body).length === 0) throw new Error("Missing input")
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select("-refreshToken -password -role")
    return res.status(200).json({
        success: response ? true : false,
        updateUser: response ? response : `update user ${response.email} fail`
    })
})
const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error("Missing input")
    console.log(uid);
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select("-refreshToken -password -role")
    return res.status(200).json({
        success: response ? true : false,
        updateUser: response ? response : `update user ${response.email} fail`
    })
})

const updateAddressUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!req.body.address) throw new Error("Missing input")
    const response = await User.findByIdAndUpdate(_id, { address: req.body.address }, { new: true }).select("-refreshToken -password -role")
    return res.status(200).json({
        success: response ? true : false,
        updateUser: response ? response : `update user ${response.email} fail`
    })
})

const updateCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { pid, quantity, color } = req.body
    if (!pid || !quantity || !color) throw new Error("Missing input")
    const user = await User.findById(_id).select("cart")
    const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid)
    if (alreadyProduct) {
        if (alreadyProduct.color === color) {
            const response = await User.updateOne({
                cart: { $elemMatch: alreadyProduct }
            }, {
                $set: { "cart.$.quantity": quantity }
            }, {
                new: true
            })
            return res.status(200).json({
                success: response ? true : false,
                updateUser: response ? response : `update user ${response.email} fail`
            })
        } else {
            const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color } } }, { new: true })
            return res.status(200).json({
                success: response ? true : false,
                updateUser: response ? response : `update user ${response.email} fail`
            })
        }
    } else {
        const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color } } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            updateUser: response ? response : `update user ${response.email} fail`
        })
    }

})
module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateAddressUser,
    updateCart
}