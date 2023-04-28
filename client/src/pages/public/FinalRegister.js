import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import Swal from 'sweetalert2'
const { LOGIN } = path

const FinalRegister = () => {
    const { status } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (status === 'failed') Swal.fire('Lỗi!', 'Đăng ký không thành công', 'error').then(() => navigate(`/${LOGIN}`))
        if (status === 'success') Swal.fire('Thông báo!', 'Đăng ký thành công. Vui lòng đăng nhập', 'success').then(() => navigate(`/${LOGIN}`))
    }, [])
    return (
        <div className='h-screen w-screen bg-gray-100'>
        </div>
    )
}

export default FinalRegister
