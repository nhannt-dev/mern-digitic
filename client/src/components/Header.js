import React from 'react'
import { logo } from '../assets'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'
import path from '../utils/path'
import { useSelector } from 'react-redux'

const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle, RiAdminFill } = icons
const { HOME, MEMBER, DASHBOARD, PROFILE, ADMIN } = path

const Header = () => {
  const { current } = useSelector(state => state.user)

  return (
    <div className='flex justify-between w-main h-[110px] py-[35px]'>
      <Link to={`/${HOME}`}>
        <img src={logo} alt='logo' className='w-[234px] object-contain' />
      </Link>
      <div className='flex text-[13px]'>
        <div className='flex flex-col px-6 border-r items-center'>
          <span className='flex gap-4 items-center'>
            <RiPhoneFill color='red' />
            <span className='font-semibold'>(+84) 35603 5625</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className='flex flex-col px-6 border-r items-center'>
          <span className='flex gap-4 items-center'>
            <MdEmail color='red' />
            <span className='font-semibold'>nhan.nguyentrong.dev@gmail.com</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        {current && <>
          <div className='cursor-pointer flex items-center px-6 border-r justify-center gap-2'>
            <BsHandbagFill color='red' />
            <span>0 item(s)</span>
          </div>
          <Link to={+current?.role === 1 ? `/${ADMIN}/${DASHBOARD}` : `/${MEMBER}/${PROFILE}`} className='gap-2 flex items-center px-6 justify-center'>
            {+current?.role === 1 ? <RiAdminFill color='red' /> : <FaUserCircle color='red' />}
            <span>{+current?.role === 1 ? 'Admin' : 'Profile'}</span>
          </Link>
        </>}
      </div>
    </div>
  )
}

export default Header