import React, { useCallback, useEffect, useState } from 'react'
import { InputField, Button } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { apiLogin, apiRegister, apiForgotPassword, apiFinalRegister } from '../../apis'
import Swal from 'sweetalert2'
import path from '../../utils/path'
import { login } from '../../app/userSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { validate } from '../../utils/helpers'

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
  const [invalid, setInvalid] = useState([])
  const [isVerified, setIsVerified] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')

  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email })
    if (response?.success) {
      toast.success(response?.mes)
      setIsForgotPassword(false)
    } else {
      toast.error(response?.mes)
    }
  }

  useEffect(() => {
    setPayload({
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      mobile: ''
    })
  }, [isRegister])

  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload
    const invalid = isRegister ? validate(payload, setInvalid) : validate(data, setInvalid)
    if (invalid === 0) {
      if (isRegister) {
        const response = await apiRegister(payload)
        if (response?.success) {
          setIsVerified(true)
        }
      } else {
        const response = await apiLogin(data)
        if (response?.success) {
          dispatch(login({ isLoggedIn: true, token: response?.accessToken, userData: response?.userData }))
          Swal.fire('Đăng nhập thành công.', response?.mes, 'success')
          navigate(`/${HOME}`)
          setPayload({
            email: '',
            password: ''
          })
        }
      }
    }
  }, [payload, isRegister])

  const finalRegister = async () => {
    const response = await apiFinalRegister(token)
    if (response?.success) {
      Swal.fire('Thông báo', response?.mes, 'success').then(() => {
        setIsRegister(false)
        setPayload({
          email: '',
          firstname: '',
          lastname: '',
          password: '',
          mobile: ''
        })
      }
      )
    } else Swal.fire('Lỗi!', response?.mes, 'error')
    setIsVerified(false)
    setToken('')
  }

  return (
    <div className='w-screen h-screen relative'>
      {isVerified && <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay z-50 flex flex-col justify-center items-center'>
        <div className='bg-white w-[500px] rounded-md p-8'>
          <h4>Vui lòng nhập mã đăng ký chúng tôi đã gửi cho bạn vào ô bên dưới để hoàn tất quá trình đăng ký của bạn:</h4>
          <input value={token} onChange={e => setToken(e.target.value)} className='p-2 border rounded-md outline-none' />
          <button onClick={finalRegister} type='button' className='px-4 py-2 bg-blue-500 font-semibold text-white rounded-md ml-4'>Xác thực</button>
        </div>
      </div>}
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
            <InputField value={payload.firstname} setValue={setPayload} nameKey='firstname' invalid={invalid} setInvalid={setInvalid} />
            <InputField value={payload.lastname} setValue={setPayload} nameKey='lastname' invalid={invalid} setInvalid={setInvalid} />
          </div>}
          <InputField value={payload.email} setValue={setPayload} nameKey='email' invalid={invalid} setInvalid={setInvalid} />
          {isRegister && <InputField value={payload.mobile} setValue={setPayload} nameKey='mobile' invalid={invalid} setInvalid={setInvalid} />}
          <InputField value={payload.password} setValue={setPayload} nameKey='password' type='password' invalid={invalid} setInvalid={setInvalid} />
          <Button name={isRegister ? 'Register' : 'Login'} handleOnClick={handleSubmit} fw />
          <div className='flex items-center justify-between my-2 w-full text-sm'>
            {!isRegister && <span onClick={() => setIsForgotPassword(true)} className='text-blue-500 cursor-pointer hover:underline'>Forgot password?</span>}
            {!isRegister && <span onClick={() => setIsRegister(true)} className='text-blue-500 cursor-pointer hover:underline'>Create account</span>}
            {isRegister && <span onClick={() => setIsRegister(false)} className='text-blue-500 cursor-pointer hover:underline w-full text-center'>Login now!</span>}
          </div>
          <Link to={`/${HOME}`} className='text-blue-500 hover:underline text-sm cursor-pointer'>Go back</Link>
        </div>
      </div>
    </div>
  )
}

export default Login