const { default: mongoose } = require('mongoose')
mongoose.set('strictQuery', false)
const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        if (conn.connection.readyState === 1) console.log('Kết nối DB thành công!')

    } catch (error) {
        console.log('Kết nối DB thất bại')
        throw new Error(error)
    }
}

module.exports = dbConnect