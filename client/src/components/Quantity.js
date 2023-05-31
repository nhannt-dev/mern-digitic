import React, { memo } from 'react'

const Quantity = ({ quantity, handle, handleChangeQuantity }) => {
    return (
        <div className='flex items-center'>
            <span onClick={() => handleChangeQuantity('minus')} className='cursor-pointer p-2 border-r border-black'>-</span>
            <input min={1} max={10} value={quantity} onChange={e => handle(e.target.value)} className='py-1 px-4 outline-none text-center w-[50px]' type='number' />
            <span onClick={() => handleChangeQuantity('plus')} className='cursor-pointer p-2 border-l border-black'>+</span>
        </div>
    )
}

export default memo(Quantity)
