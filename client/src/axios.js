import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URI
})

instance.interceptors.request.use(function (config) {
    let lcData = window.localStorage.getItem('persist:shop/user')
    if (lcData && typeof lcData === 'string') {
        lcData = JSON.parse(lcData)
        const acToken = JSON.parse(lcData?.token)
        config.headers = { Authorization: `Bearer ${acToken}` }
        return config
    } else return config
}, function (error) {
    return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    return error.response.data
})

export default instance