const express = require("express")
var bodyParser = require('body-parser')
require('dotenv').config()
const dbConnect = require("./config/db.connect")
const initRoutes = require("./routes/index")
var cookieParser = require('cookie-parser')

const app = express()

const port = process.env.PORT || 8888
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
dbConnect()


initRoutes(app)


app.listen(port, () => {
    console.log("SERVER IS RUNNING on the PORT", port);
})