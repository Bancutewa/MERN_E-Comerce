const Blog = require('../models/blog.model')
const asyncHandler = require("express-async-handler")

const createBlog = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("Missing inputs")
    const response = await Blog.create(req.body)
    return res.status(200).json({
        success: true,
        createdBlog: response ? response : "Cannot create new blog"
    })
})
const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (Object.keys(req.body).length == 0) throw new Error("Missing Input")
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true })
    return res.status(200).json({
        success: true,
        createdBlog: response ? response : "Cannot update blog"
    })
})

const getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find()
    return res.status(200).json({
        success: true,
        createdBlog: response ? response : "Cannot get blogs"
    })
})

const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.body
    console.log(bid);

    if (!bid) throw new Error("Missing Input")
    const blog = await Blog.findById(bid)

    // Nếu người dùng đã dislike thì bỏ dislike của người dùng đó đi
    const alreadyDisliked = blog.dislikes?.find(el => el.toString() === _id)
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }

    // Nếu người dùng đã like thì xoá like của người dùng đó khỏi mảng, nếu chưa like thì đẩy vào mảng likes
    const isLiked = blog.likes?.find(el => el.toString() === _id)
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
})

module.exports = {
    createBlog,
    updateBlog,
    getBlogs,
    likeBlog
}