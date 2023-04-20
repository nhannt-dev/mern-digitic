import React, { memo } from 'react'
import icons from '../utils/icons'

const { MdEmail } = icons

const Footer = () => {
  return (
    <div className='w-full'>
      <div className='h-[103px] w-full bg-main flex items-center justify-center'>
        <div className='w-main flex items-center justify-between'>
          <div className='flex flex-col flex-1'>
            <span className='uppercase text-[20px] text-gray-200'>sign up to newletter</span>
            <small className='text-[13px] text-gray-200'>Subscribe now and receive weekly newsletter</small>
          </div>
          <div className='flex-1 flex items-center'>
            <input className='p-4 pr-0 rounded-l-full w-full bg-[#f04646] outline-none text-gray-100 placeholder:text-gray-300' placeholder='Email address' />
            <div className='h-[56px] w-[56px] bg-[#f04646] rounded-r-full flex items-center justify-center text-white cursor-pointer'>
              <MdEmail size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className='h-[407px] w-full bg-gray-900 flex items-center justify-center text-white text-[13px]'>
        <div className='w-main flex items-start'>
          <div className='flex-2 flex flex-col gap-2'>
            <h3 className='uppercase mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>about us</h3>
            <span>
              <span>Address: </span>
              <span className='opacity-70'>474 Ontario St Toronto, ON M4X 1M7 Canada</span>
            </span>

            <span>
              <span>Phone: </span>
              <span className='opacity-70'>(+1234)56789xxx</span>
            </span>

            <span>
              <span>Mail: </span>
              <span className='opacity-70'>tadathemes@gmail.com</span>
            </span>
          </div>
          <div className='flex-1 flex flex-col gap-2'>
            <h3 className='uppercase mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>infomation</h3>
            <span className='capitalize'>typography</span>
            <span className='capitalize'>gallery</span>
            <span className='capitalize'>store location</span>
            <span className='capitalize'>today's deals</span>
            <span className='capitalize'>contact</span>
          </div>
          <div className='flex-1 flex flex-col gap-2'>
            <h3 className='uppercase mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>who we are?</h3>
            <span className='capitalize'>help</span>
            <span className='capitalize'>free shipping</span>
            <span className='capitalize'>FAQs</span>
            <span className='capitalize'>return & exchange</span>
            <span className='capitalize'>testimonials</span>
          </div>
          <div className='flex-1'>
            <h3 className='uppercase mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>#digitalworldstore</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Footer)