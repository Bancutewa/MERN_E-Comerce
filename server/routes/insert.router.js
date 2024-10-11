const { insertProduct, insertCategory } = require('../controllers/insert.controller')
const InsertRouter = require('express').Router()

InsertRouter.post('/', insertProduct)
InsertRouter.post('/cate', insertCategory)

module.exports = InsertRouter