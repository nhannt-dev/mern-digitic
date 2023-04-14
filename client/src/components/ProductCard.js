import React from 'react'
import { formatMoney, renderStar } from '../utils/helpers'

const ProductCard = ({ thumb, title, totalRatings, price }) => {
    return (
        <div className='w-1/3 flex-auto mt-[15px] flex px-[10px] mb-[20px]'>
            <div className='flex w-full border'>
                <img src={thumb} alt='nhannt' className='w-[120px] object-contain p-4' />
                <div className='flex flex-col mt-[15px] items-start gap-1 w-full text-xs'>
                    <span className='line-clamp-1'>{title}</span>
                    <span className='flex h-4'>{renderStar(totalRatings, 14)}</span>
                    <span>{`${formatMoney(price)} VNĐ`}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard