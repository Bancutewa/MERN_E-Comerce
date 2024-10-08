const Brand = require('../models/brand.model')
const asyncHandler = require("express-async-handler")
const slugify = require('slugify')


const createBrand = asyncHandler(async (req, res) => {
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const response = await Brand.create(req.body)
    return res.json({
        success: true,
        createdBrand: response ? response : "Cannot create new Brand"
    })
})

const getBrands = asyncHandler(async (req, res) => {
    const response = await Brand.find().select('title _id slug')
    return res.json({
        success: true,
        productBrands: response ? response : "Cannot get Brands"
    })
})

const updateBrand = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const response = await Brand.findByIdAndUpdate(bid, req.body, { new: true })
    return res.json({
        success: true,
        updatedBrand: response ? response : "Cannot update Brand"
    })
})

const deleteBrand = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const response = await Brand.findByIdAndDelete(bid)
    return res.json({
        success: true,
        deletedBrand: response ? response : "Cannot delete Brand"
    })
})
module.exports = {
    createBrand,
    getBrands,
    updateBrand,
    deleteBrand
}