const Product = require('../models/product')
const ProductCategory = require('../models/category')
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")
const dataProduct = require('../database/scraping-data/ecommerce.json')
const dataCategory = require('../database/scraping-data/cate_brand')

const convertProduct = async (product) => {
    await Product.create({
        name: product?.name,
        // slug: slugify(product?.name) + Math.round(Math.random() * 1000) + '',
        description: product?.description[1],
        price: Number(product?.price?.match(/\d/g).slice(0, 2).join("")),
        category: product?.category,
        // brand: product?.brand,
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 100),
        // photo: product?.images,
        // color: product?.variants?.find(el => el.label === 'Color')?.variants[0],
        photo: product?.thumb,
        // totalRatings: Math.round(Math.random() * 5)

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
        name: category?.cate,
    })
}
const insertCategory = asyncHandler(async (req, res) => {
    const promises = [];
    for (let category of dataCategory) promises.push(convertCategory(category))
    await Promise.all(promises)
    return res.json("done")
})
module.exports = { insertProduct, insertCategory }