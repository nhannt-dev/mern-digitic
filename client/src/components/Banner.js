import React from 'react'
import { banner } from '../assets'

const Banner = () => {
  return (
    <div className='w-full'>
      <img src={banner} alt='banner' className='h-[400px] w-full object-cover' />
    </div>
  )
}

export default Banner