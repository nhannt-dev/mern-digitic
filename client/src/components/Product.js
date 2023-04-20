import React, { useState } from 'react'
import { formatMoney, renderStar } from '../utils/helpers'
import { label, label2 } from '../assets'
import Optional from './Optional'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'
import path from '../utils/path'

const { DETAIL_PRODUCT } = path

const { AiFillEye, HiMenu, BsFillSuitHeartFill } = icons

const Product = ({ productData, isNew }) => {
  const [isShowOption, setIsShowOption] = useState(false)
  return (
    <div className='w-full text-base px-[10px]'>
      <Link to={`/${DETAIL_PRODUCT}/${productData?._id}/${productData?.title}`} className='w-full border rounded-sm p-[15px] flex flex-col items-center'
        onMouseEnter={e => {
          e.stopPropagation()
          setIsShowOption(true)
        }}
        onMouseLeave={e => {
          e.stopPropagation()
          setIsShowOption(false)
        }}>
        <div className='w-full relative'>
          {isShowOption && <div className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top'>
            <Optional icon={<BsFillSuitHeartFill />} />
            <Optional icon={<HiMenu />} />
            <Optional icon={<AiFillEye />} />
          </div>}
          <img src={productData?.thumb || 'https://t4.ftcdn.net/jpg/05/75/04/63/240_F_575046386_GObMZs7kBHMT9I1luFChgaWli8WcZiQy.jpg'} alt='nhannt' className='w-[243px] h-[243px] object-cover' />
          <img src={isNew ? label : label2} alt='nhannt' className='absolute top-[-16px] left-[-16px] w-[81px] h-[16.67px] rounded-sm' />
        </div>
        <div className='flex flex-col mt-[15px] justify-start gap-1 items-start w-full'>
          <span className='line-clamp-1'>{productData?.title}</span>
          <span className='flex h-4'>{renderStar(productData?.totalRatings)?.map((el, index) => (
            <span key={index}>{el}</span>
          ))}</span>
          <span>{formatMoney(productData?.price)} VND</span>
        </div>
      </Link>
    </div>
  )
}

export default Product