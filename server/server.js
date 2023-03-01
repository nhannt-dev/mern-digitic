const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const initRoutes = require('./routes')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 8888

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dbConnect()
initRoutes(app)

app.listen(port, () => {
    console.log(`Server đang chạy tại địa chỉ http://localhost:${port}`)
})