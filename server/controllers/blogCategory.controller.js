const blogCategory = require('../models/blogCategory.model')
const asyncHandler = require("express-async-handler")
const slugify = require('slugify')


const createBlogCategory = asyncHandler(async (req, res) => {
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const response = await blogCategory.create(req.body)
    return res.json({
        success: true,
        createdBlogCategory: response ? response : "Cannot create new blogCategory"
    })
})

const getBlogCategories = asyncHandler(async (req, res) => {
    const response = await blogCategory.find().select('title _id slug')
    return res.json({
        success: true,
        blogCategoryCategories: response ? response : "Cannot get blogCategory"
    })
})

const updateBlogCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const response = await blogCategory.findByIdAndUpdate(bcid, req.body, { new: true })
    return res.json({
        success: true,
        updatedblogCategory: response ? response : "Cannot update blogCategory"
    })
})

const deleteBlogCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params
    const response = await blogCategory.findByIdAndDelete(bcid)
    return res.json({
        success: true,
        deletedblogCategory: response ? response : "Cannot delete blogCategory"
    })
})
module.exports = {
    createBlogCategory,
    getBlogCategories,
    updateBlogCategory,
    deleteBlogCategory
}