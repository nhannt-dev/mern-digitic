import React, { memo, useEffect, useState } from 'react'
import icons from '../utils/icons'
import { colors } from '../utils/constants'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'

const { AiOutlineDown } = icons

const SearchItem = ({ name, actived, changeActive, type = 'checkbox' }) => {
    const { category } = useParams()
    const [selected, setSelected] = useState([])
    const handleSelect = (e) => {
        const already = selected.find(el => el === e.target.value)
        if (already) setSelected(prev => prev.filter(el => el !== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
        changeActive(null)
    }
    const navigate = useNavigate()

    useEffect(() => {
        navigate({
            pathname: `/${category}`,
            search: createSearchParams({
                color: selected
            }).toString()
        })
    }, [selected])

    return (
        <div onClick={() => changeActive(name)} className='cursor-pointer p-3 text-gray-500 gap-6 text-xs relative border border-gray-800 flex justify-between items-center'>
            <span className='capitalize'>{name}</span>
            <AiOutlineDown />
            {actived == name && <div className='z-20 absolute top-[calc(100%+1px)] left-0 w-fit p-4 border rounded-sm bg-white min-w-[150px]'>
                {type === 'checkbox' && <div>
                    <div className='p-4 items-center flex justify-between gap-8 border-b'>
                        <span className='whitespace-nowrap'>{selected.length} selected</span>
                        <span onClick={(e) => {
                            e.stopPropagation()
                            setSelected([])
                        }} className='cursor-pointer underline hover:text-main capitalize'>reset</span>
                    </div>
                    <div className='flex flex-col gap-3 mt-4' onClick={e => e.stopPropagation()}>
                        {colors.map((el, index) => (
                            <div key={index} className='flex items-center gap-4'>
                                <input value={el} checked={selected.some(i => i === el)} onClick={handleSelect} className='form-checkbox' type='checkbox' id={el} />
                                <label className='text-gray-700' htmlFor={el}>{el.toUpperCase()}</label>
                            </div>
                        ))}</div>
                </div>}
            </div>}
        </div>
    )
}

export default memo(SearchItem)