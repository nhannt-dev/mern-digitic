import React, { useEffect, useRef, useState } from 'react'
import { logo } from '../assets'
import { status } from '../utils/constants'
import icons from '../utils/icons'
import { Button } from '.'

const { AiFillStar } = icons

const VoteModal = ({ productName, handleSubmitVoting }) => {
    const modalRef = useRef()
    const [choosen, setChoosen] = useState(null)
    const [comment, setComment] = useState('')
    const [score, setScore] = useState(null)

    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, [])
    return (
        <div ref={modalRef} onClick={e => e.stopPropagation()} className='bg-white flex-col gap-4 w-[700px] p-4 flex items-center justify-center'>
            <img src={logo} className='w-[300px] my-8 object-contain' />
            <h2 className='text-center text-lg font-medium'>Đánh giá sản phẩm {productName}</h2>
            <textarea className='form-textarea resize-none rounded-md w-full placeholder:italic placeholder:text-xs placeholder:text-gray-500 text-sm' value={comment} onChange={e => setComment(e.target.value)} placeholder='Đánh giá sản phẩm...'></textarea>
            <div className='w-full flex flex-col gap-4'>
                <p>Bạn cảm thấy sản phẩm này như thế nào?</p>
                <div className='flex justify-center gap-4 items-center'>
                    {status.map((el, index) => (
                        <div onClick={() => {
                            setChoosen(+index + 1)
                            setScore(+index + 1)
                        }} className='w-[100px] h-[100px] rounded-sm p-4 flex items-center justify-center flex-col gap-2 bg-gray-200 hover:bg-gray-300 cursor-pointer' key={index}>
                            {(+choosen && +choosen >= +index + 1) ? <AiFillStar color='orange' /> : <AiFillStar color='gray' />}
                            <span>{el}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Button handleOnClick={() => handleSubmitVoting({ comment, score })} fw name='Submit' />
        </div>
    )
}

export default VoteModal
