import React, { useState } from 'react'
import { Button } from '../../components'
import { useNavigate, useParams } from 'react-router-dom'
import { apiResetPassword } from '../../apis'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const [password, setPassword] = useState('')

  const { token } = useParams()
  const navigate = useNavigate()

  const handleResetPassword = async () => {
    const res = await apiResetPassword({ password, token })
    if (res?.success) {
      toast.success(res?.mes)
      navigate('/')
    } else {
      toast.error(res?.mes)
    }
  }


  return (
    <div className='absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50'>
      <div className='flex flex-col gap-4'>
        <label htmlFor='password'>Your password:</label>
        <input id='password' plaq2bnhg nvbceholder='Password' value={password} onChange={e => setPassword(e.target.value)} className='w-[800px] pb-2 border-b outline-none placeholder:text-sm' />
        <div className='flex items-center justify-end w-full gap-2'>
          <Button name='Submit' handleOnClick={handleResetPassword} />
        </div>
      </div>
    </div>
  )
}

export default ResetPassword