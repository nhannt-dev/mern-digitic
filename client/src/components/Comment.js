import React from 'react'
import { avatarDefault } from '../assets'
import moment from 'moment'
import { renderStar } from '../utils/helpers'

const Comment = ({ image, name, updatedAt, content, star }) => {
    return (
        <div className='flex gap-4'>
            <div className='flex-none'>
                <img className='w-[25px] h-[25px] object-cover rounded-full' src={image || avatarDefault} alt='nhannt-dev' />
            </div>
            <div className='flex flex-col flex-auto'>
                <div className='flex justify-between items-center'>
                    <h3 className='font-semibold'>{name || 'Ẩn danh'}</h3>
                    <span className='text-xs italic'>{moment(updatedAt)?.fromNow()}</span>
                </div>
                <div className='flex flex-col gap-2 pl-4 text-sm mt-4 border border-[#f3f4f6] rounded-md py-2 bg-[#f3f4f6]'>
                    <span className='flex items-center gap-1'>
                        <span className='font-semibold'>Đánh giá:</span>
                        <span className='flex items-center gap-1'>{renderStar(star)}</span>
                    </span>
                    <span className='flex items-center gap-1'>
                        <span className='font-semibold'>Nhận xét:</span>
                        <span className='flex gap-1'>{content}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Comment