import React, { memo, useEffect, useState } from 'react'
import icons from '../utils/icons'
import { colors } from '../utils/constants'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { apiGetProducts } from '../apis'
import { formatMoney } from '../utils/helpers'
import useDebounce from '../utils/debounce'

const { AiOutlineDown } = icons

const SearchItem = ({ name, actived, changeActive, type = 'checkbox' }) => {
    const { category } = useParams()
    const [params] = useSearchParams()
    const [selected, setSelected] = useState([])
    const [highestPrice, setHighestPrice] = useState(0)
    const [price, setPrice] = useState({
        from: '',
        to: ''
    })

    const fetchHighestPrice = async () => {
        const response = await apiGetProducts({ sort: '-price', limit: 1 })
        if (response?.success) setHighestPrice(response?.products[0]?.price)
    }

    const handleSelect = (e) => {
        const already = selected.find(el => el === e.target.value)
        if (already) setSelected(prev => prev.filter(el => el !== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
        changeActive(null)
    }

    const navigate = useNavigate()
    const debounceFrom = useDebounce(price.from, 500)
    const debounceTo = useDebounce(price.to, 500)

    useEffect(() => {
        let param = []
        const queries = {}
        for (let i of params.entries()) param.push(i)
        for (let i of param) queries[i[0]] = i[1]
        if (selected.length > 0) {
            if (selected) queries.color = selected.join(',')
            queries.page = 1
        } else delete queries.color
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
        })
    }, [selected])

    useEffect(() => {
        if (type === 'input') fetchHighestPrice()
    }, [type])

    useEffect(() => {
        let param = []
        const queries = {}
        for (let i of params.entries()) param.push(i)
        for (let i of param) queries[i[0]] = i[1]
        if (+price.from > 0) queries.from = price.from
        else delete queries.from
        if (+price.to > 0) queries.to = price.to
        else delete queries.to
        queries.page = 1
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
        })
    }, [debounceFrom, debounceTo])
    

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
                            changeActive(null)
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
                {type === 'input' && <div onClick={e => e.stopPropagation()}>
                    <div className='p-4 items-center flex justify-between gap-8 border-b'>
                        <span className='whitespace-nowrap'>The highest price is {formatMoney(+highestPrice)} VND</span>
                        <span onClick={(e) => {
                            e.stopPropagation()
                            setPrice({ from: '', to: '' })
                            changeActive(null)
                        }} className='cursor-pointer underline hover:text-main capitalize'>reset</span>
                    </div>
                    <div className='flex items-center p-2 gap-2'>
                        <div className='flex items-center gap-2'>
                            <label htmlFor='from'>From</label>
                            <input onChange={e => setPrice(prev => ({ ...prev, from: e.target.value }))} value={price.from} className='form-input' type='number' id='from' />
                        </div>
                        <div className='flex items-center gap-2'>
                            <label htmlFor='to'>To</label>
                            <input onChange={e => setPrice(prev => ({ ...prev, to: e.target.value }))} value={price.to} className='form-input' type='number' id='to' />
                        </div>
                    </div>
                </div>}
            </div>}
        </div>
    )
}

export default memo(SearchItem)