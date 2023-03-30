require('dotenv').config()
const express = require('express')
const dbConnect = require('./config/dbconnect')
const initRoutes = require('./routes')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8888

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
    // credentials: true
}))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dbConnect()
initRoutes(app)

app.listen(port, () => {
    console.log(`Server đang chạy tại địa chỉ http://localhost:${port}`)
})