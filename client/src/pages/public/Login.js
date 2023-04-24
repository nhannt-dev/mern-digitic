import React, { useCallback, useState } from 'react'
import { InputField, Button } from '../../components'
import { useNavigate } from 'react-router-dom'
import { apiLogin, apiRegister } from '../../apis'
import Swal from 'sweetalert2'
import path from '../../utils/path'
import {register} from '../../app/userSlice'
import { useDispatch } from 'react-redux'

const { HOME } = path

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    mobile: ''
  })
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, ...data } = payload
    if (isRegister) {
      const response = await apiRegister(payload)
      Swal.fire(response?.success ? 'Đăng ký thành công. Vui lòng đăng nhập' : 'Có lỗi trong quá trình thao tác', response?.mes, response?.success ? 'success' : 'error')
      if (response?.success) {
        setIsRegister(false)
        setPayload({
          email: '',
          firstname: '',
          lastname: '',
          password: '',
          mobile: ''
        })
      }
    } else {
      const response = await apiLogin(payload)
      if (response?.success) {
        dispatch(register({ isLoggedIn: true, token: response?.accessToken, userData: response?.userData }))
        Swal.fire('Đăng nhập thành công.', response?.mes, 'success')
        navigate(`/${HOME}`)
        setPayload({
          email: '',
          password: ''
        })
      }
    }
  }, [payload])

  return (
    <div className='w-screen h-screen relative'>
      <img src='https://img.freepik.com/free-vector/shopping-cart-vector-technology-icon-silver-gray-background_53876-112145.jpg?w=826&t=st=1682161473~exp=1682162073~hmac=a43d60059bf7b7df0096d59d67a49fd2f70c84813392a7f02b8f40027a1240fc' alt='nhannt' className='w-full h-full object-cover' />
      <div className='absolute top-0 bottom-0 left-0 right-1/2 flex items-center justify-center'>
        <div className='p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]'>
          <h1 className='text-[28px] font-semibold text-main mb-8'>{isRegister ? 'Register' : 'Login'}</h1>
          {isRegister && <div className='flex gap-2 items-center'>
            <InputField value={payload.firstname} setValue={setPayload} nameKey='firstname' />
            <InputField value={payload.lastname} setValue={setPayload} nameKey='lastname' />
          </div>}
          <InputField value={payload.email} setValue={setPayload} nameKey='email' />
          {isRegister && <InputField value={payload.mobile} setValue={setPayload} nameKey='mobile' />}
          <InputField value={payload.password} setValue={setPayload} nameKey='password' type='password' />
          <Button name={isRegister ? 'Register' : 'Login'} handleOnClick={handleSubmit} fw />
          <div className='flex items-center justify-between my-2 w-full text-sm'>
            {!isRegister && <span className='text-blue-500 cursor-pointer hover:underline'>Forgot password?</span>}
            {!isRegister && <span onClick={() => setIsRegister(true)} className='text-blue-500 cursor-pointer hover:underline'>Create account</span>}
            {isRegister && <span onClick={() => setIsRegister(false)} className='text-blue-500 cursor-pointer hover:underline w-full text-center'>Login now!</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login