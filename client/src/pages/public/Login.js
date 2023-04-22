import React, { useCallback, useState } from 'react'
import { InputField, Button } from '../../components'

const Login = () => {
  const [payload, setPayload] = useState({
    email: '',
    name: '',
    password: ''
  })
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = useCallback(() => {
    console.log(payload)
  }, [payload])

  return (
    <div className='w-screen h-screen relative'>
      <img src='https://img.freepik.com/free-vector/shopping-cart-vector-technology-icon-silver-gray-background_53876-112145.jpg?w=826&t=st=1682161473~exp=1682162073~hmac=a43d60059bf7b7df0096d59d67a49fd2f70c84813392a7f02b8f40027a1240fc' alt='nhannt' className='w-full h-full object-cover' />
      <div className='absolute top-0 bottom-0 left-0 right-1/2 flex items-center justify-center'>
        <div className='p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]'>
          <h1 className='text-[28px] font-semibold text-main mb-8'>{isRegister ? 'Register' : 'Login'}</h1>
          {isRegister && <InputField value={payload.name} setValue={setPayload} nameKey='name' />}
          <InputField value={payload.email} setValue={setPayload} nameKey='email' />
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