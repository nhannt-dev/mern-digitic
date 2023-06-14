import React, { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import path from '../utils/path'
import { getCurrent } from '../app/actions'
import { useDispatch, useSelector } from 'react-redux'
import icons from '../utils/icons'
import { logout } from '../app/userSlice'

const { LOGIN } = path
const { FiLogOut } = icons

const TopHeader = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, current } = useSelector(state => state.user)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent())
    }, 300)
    return () => {
      clearTimeout(timeout)
    }

  }, [dispatch, isLoggedIn])

  return (
    <div className='h-[38px] w-full bg-main flex items-center justify-center'>
      <div className='w-main flex items-center justify-between text-xs text-white'>
        <span>ORDER ONLINE OR CALL US (+84) 35603 5625</span>
        {isLoggedIn ? <div className='flex gap-4 text-sm items-center'>
          <span>Xin chào,
            <strong> {current?.firstname} {current?.lastname}</strong>
          </span>
          <span onClick={() => dispatch(logout())} className='hover:rounded-full hover:bg-gray-200 p-2 cursor-pointer hover:text-main'>
            <FiLogOut size={18} />
          </span>
        </div> : <Link className='hover:text-gray-800' to={`/${LOGIN}`}>Sign In or Create Account</Link>}
      </div>
    </div>
  )
}

export default memo(TopHeader)