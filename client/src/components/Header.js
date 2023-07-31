import React, { useEffect, useState } from 'react'
import { logo } from '../assets'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'
import path from '../utils/path'
import { useSelector } from 'react-redux'

const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle, RiAdminFill } = icons
const { HOME, MEMBER, DASHBOARD, PROFILE, ADMIN } = path

const Header = () => {
  const { current } = useSelector(state => state.user)
  const [isShowContext, setIsShowContext] = useState(false)

  const handleClickOutside = (e) => {
    const profile = document.getElementById('profile').contains(e.target)
    if (!profile) setIsShowContext(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])


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
          <div id='profile' onClick={() => setIsShowContext(!isShowContext)} className='relative cursor-pointer flex items-center px-6 border-r justify-center gap-2'>
            {+current?.role === 1 ? <RiAdminFill color='red' /> : <FaUserCircle color='red' />}
            <span>{+current?.role === 1 ? 'Admin' : 'Profile'}</span>
            {isShowContext && <div onClick={(e) => e.stopPropagation()} className='flex flex-col border min-w-[200px] py-2 absolute top-full left-0 bg-gray-300'>
              {+current?.role === 1 ? (<Link to={`/${ADMIN}/${DASHBOARD}`} className='hover:bg-gray-100 p-2'>Dashboard</Link>) : (<Link to={`/${MEMBER}/${PROFILE}`} className='hover:bg-gray-100 p-2'>Personal</Link>)}
            </div>}
          </div>
        </>}
      </div>
    </div>
  )
}

export default Header