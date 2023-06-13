import React, { useEffect, useRef } from 'react'
import icons from '../utils/icons'

const { AiFillStar } = icons

const Vote = ({ num, ratingCount = 0, total }) => {
    const pcRef = useRef()
    useEffect(() => {
        const percent = Math.round(ratingCount * 100 / total) || 0
        pcRef.current.style.cssText = `right: ${100 - percent}%`
    }, [ratingCount, total])
    return (
        <div className='flex items-center gap-2'>
            <div className='flex flex-1 items-center gap-1 text-sm text-gray-500'>
                <span className='font-semibold text-black'>{num}</span>
                <AiFillStar color='orange' />
            </div>
            <div className='flex-8'>
                <div className='w-full h-[6px] relative bg-gray-200 rounded-l-full rounded-r-full'>
                    <div ref={pcRef} className='absolute inset-0 bg-red-500'></div>
                </div>
            </div>
            <div className='flex-2 flex justify-end text-sm'>{ratingCount} lượt đánh giá</div>
        </div>
    )
}

export default Vote