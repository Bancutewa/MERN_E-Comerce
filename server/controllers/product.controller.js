const { response } = require("express")
const Product = require("../models/product.model")
const User = require("../models/user.model")
const asyncHandler = require("express-async-handler")
const slugify = require('slugify')


const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("Missing inputs")
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createProduct: newProduct ? newProduct : 'Cannot create new product'
    })
})


const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Cannot get details product'
    })
})

const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    // Tach cac truong dac biet ra khoi query
    const excludeFields = ['limit', 'page', 'sort', 'fields']
    excludeFields.forEach(el => delete queries[el])

    // Format lai query cho dung dinh dang mongoose (VD: price = gt(500) ==> $gt(500))
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    const formatQueries = JSON.parse(queryString)

    let queryCommand
    // Filtering
    if (req.query?.title) formatQueries.title = { $regex: queries.title, $options: 'i' }
    queryCommand = Product.find(formatQueries)


    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    } else {
        queryCommand = queryCommand.sort('-createdAt')
    }



    // Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }

    // Pagination
    const page = +req.query.page || 1
    const limit = +req.query.limit || 2
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)

    // Run query
    queryCommand.then(response => {
        return Product.find(formatQueries).countDocuments()
            .then(counts => {
                res.status(200).json({
                    success: true,
                    counts,
                    productsDatas: response || [],
                });
            });
    })
        .catch(err => {
            console.error("Error in product query:", err);
            res.status(500).json({
                success: false,
                error: "Internal Server Error"
            });
        });



})


const updateProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("Missing inputs")
    const { pid } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct ? updatedProduct : 'Cannot update product'
    })
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? deletedProduct : 'Cannot delete product'
    })
})

const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user

    const { star, comment, pid } = req.body
    if (!star || !pid) throw new Error("Missing input")
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.rating?.find(el => el.postedBy.toString() === _id)
    if (alreadyRating) {
        await Product.updateOne({
            rating: { $elemMatch: alreadyRating }
        }, {
            $set: { "rating.$.star": star, "rating.$.comment": comment }
        })
    }
    else {
        await Product.findByIdAndUpdate(pid, {
            $push: { rating: { star, comment, postedBy: _id } }
        }, { new: true })
    }

    // total rating
    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct?.rating?.length
    const sumRating = updatedProduct?.rating.reduce((sum, el) => sum + +el.star, 0)
    updatedProduct.totalRatings = Math.round(sumRating * 10 / ratingCount) / 10

    await updatedProduct.save()
    return res.status(200).json({
        status: true,
        updatedProduct
    }
    )
})
module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings
}
