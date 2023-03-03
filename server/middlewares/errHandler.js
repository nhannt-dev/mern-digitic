exports.notFound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} không tồn tại!`)
    res.status(404)
    next(error)
}

exports.errHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    return res.status(statusCode).json({
        success: false,
        mes: error?.message
    })
}