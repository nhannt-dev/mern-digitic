import React, { useCallback, useState } from 'react'
import { InputField, Button } from '../../components'
import { useNavigate } from 'react-router-dom'
import { apiLogin, apiRegister, apiForgotPassword } from '../../apis'
import Swal from 'sweetalert2'
import path from '../../utils/path'
import { register } from '../../app/userSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

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
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email })
    if (response?.success) {
      toast.success(response?.mes)
      setIsForgotPassword(false)
    } else {
      toast.error(response?.mes)
    }
  }

  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, ...data } = payload
    if (isRegister) {
      const response = await apiRegister(payload)
      Swal.fire(response?.success ? 'Thông báo' : 'Có lỗi trong quá trình thao tác', response?.mes, response?.success ? 'success' : 'error')
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
      {isForgotPassword && <div className='absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50'>
        <div className='flex flex-col gap-4'>
          <label htmlFor='email'>Your email:</label>
          <input id='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} className='w-[800px] pb-2 border-b outline-none placeholder:text-sm' />
          <div className='flex items-center justify-end w-full gap-2'>
            <Button name='Cancel' handleOnClick={() => setIsForgotPassword(false)} />
            <Button name='Submit' handleOnClick={handleForgotPassword} />
          </div>
        </div>
      </div>}
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
            {!isRegister && <span onClick={() => setIsForgotPassword(true)} className='text-blue-500 cursor-pointer hover:underline'>Forgot password?</span>}
            {!isRegister && <span onClick={() => setIsRegister(true)} className='text-blue-500 cursor-pointer hover:underline'>Create account</span>}
            {isRegister && <span onClick={() => setIsRegister(false)} className='text-blue-500 cursor-pointer hover:underline w-full text-center'>Login now!</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login