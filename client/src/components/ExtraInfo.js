import React, { memo } from 'react'

const ExtraInfo = ({ title, sub, icon }) => {
    return (
        <div className='flex items-center p-4 gap-4 mb-[10px] border rounded-md'>
            <span className='p-2 bg-gray-600 rounded-full flex items-center justify-center text-white'>{icon}</span>
            <div className='flex flex-col text-sm text-gray-500'>
                <span className='font-medium capitalize'>{title}</span>
                <span className='text-xs'>{sub}</span>
            </div>
        </div>
    )
}

export default memo(ExtraInfo)
