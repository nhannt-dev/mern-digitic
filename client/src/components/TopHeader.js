import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import path from '../utils/path'

const { LOGIN } = path

const TopHeader = () => {
  return (
    <div className='h-[38px] w-full bg-main flex items-center justify-center'>
      <div className='w-main flex items-center justify-between text-xs text-white'>
        <span>ORDER ONLINE OR CALL US (+84) 35603 5625</span>
        <Link to={`/${LOGIN}`}>Sign In or Create Account</Link>
      </div>
    </div>
  )
}

export default memo(TopHeader)