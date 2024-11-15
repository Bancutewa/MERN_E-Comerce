const Product = require('../models/product.model')
const ProductCategory = require('../models/productCategory.model')
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")
const dataProduct = require('../../database/scraping-data/ecommerce.json')
const dataCategory = require('../../database/scraping-data/cate_brand')

const convertProduct = async (product) => {
    await Product.create({
        title: product?.name,
        slug: slugify(product?.name) + Math.round(Math.random() * 1000) + '',
        description: product?.description,
        brand: product?.brand,
        price: Math.round(Number(product?.price?.match(/\d/g).join("") / 100)),
        category: product?.category[1],
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 100),
        images: product?.images,
        color: product?.variants?.find(el => el.label === 'Color')?.variants[0],
        thumb: product?.thumb,
        totalRatings: Math.round(Math.random() * 5)

    })
}
const insertProduct = asyncHandler(async (req, res) => {
    const promises = [];
    for (let product of dataProduct) promises.push(convertProduct(product))
    await Promise.all(promises)
    return res.json("done")
})

const convertCategory = async (category) => {
    await ProductCategory.create({
        title: category?.cate,
        slug: slugify(category?.cate),
        brand: category?.brand,
        image: category?.image
    })
}
const insertCategory = asyncHandler(async (req, res) => {
    const promises = [];
    for (let category of dataCategory) promises.push(convertCategory(category))
    await Promise.all(promises)
    return res.json("done")
})
module.exports = { insertProduct, insertCategory }