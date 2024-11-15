const ProductCategory = require('../models/productCategory.model')
const asyncHandler = require("express-async-handler")
const slugify = require('slugify')


const createCategory = asyncHandler(async (req, res) => {
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const response = await ProductCategory.create(req.body)
    return res.json({
        success: true,
        createdCategory: response ? response : "Cannot create new Product Category"
    })
})

const getCategories = asyncHandler(async (req, res) => {
    const response = await ProductCategory.find()
    return res.json({
        success: true,
        productCategories: response ? response : "Cannot get Product Categories"
    })
})

const updateCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, { new: true })
    return res.json({
        success: true,
        updatedCategory: response ? response : "Cannot update Product Category"
    })
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params
    const response = await ProductCategory.findByIdAndDelete(pcid)
    return res.json({
        success: true,
        deletedCategory: response ? response : "Cannot delete Product Category"
    })
})
module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}