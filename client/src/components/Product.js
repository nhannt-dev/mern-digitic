import React from 'react'
import { formatMoney } from '../utils/helpers'
import label from '../assets/label.png'
import label2 from '../assets/label2.png'

const Product = ({ productData, isNew }) => {
  return (
    <div className='w-full text-base px-[10px]'>
      <div className='w-full border rounded-sm p-[15px] flex flex-col items-center'>
        <div className='w-full relative'>
          <img src={productData?.thumb || 'https://t4.ftcdn.net/jpg/05/75/04/63/240_F_575046386_GObMZs7kBHMT9I1luFChgaWli8WcZiQy.jpg'} className='w-[243px] h-[243px] object-cover' />
          <img src={isNew ? label : label2} className='absolute top-[-16px] left-[-16px] w-[81px] h-[16.67px] rounded-sm' />
        </div>
        <div className='flex flex-col mt-[15px] justify-start gap-1 items-start w-full'>
          <span className='line-clamp-1'>{productData?.title}</span>
          <span>{formatMoney(productData?.price)} VND</span>
        </div>
      </div>
    </div>
  )
}

export default Product