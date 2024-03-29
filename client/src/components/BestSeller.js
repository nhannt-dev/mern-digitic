import React, { useEffect, useState } from 'react'
import { apiGetProducts } from '../apis'
import { CustomSlider } from '../components'
import { getNewProducts } from '../app/actions'
import { useDispatch, useSelector } from 'react-redux'

const tabs = [
    {
        id: 1,
        name: 'best sellers'
    },
    {
        id: 2,
        name: 'new arrivals'
    }
]

const BestSeller = () => {
    const dispatch = useDispatch()
    const { newProducts } = useSelector(state => state.product)
    
    const [bestSellers, setBestSellers] = useState(null)
    const [activedTab, setActivedTab] = useState(1)
    const [products, setProducts] = useState(null)

    const fetchProducts = async () => {
        const res = await apiGetProducts({ sort: '-sold' })
        if (res?.success) {
            setBestSellers(res?.products)
            setProducts(res?.products)
        }
    }

    useEffect(() => {
        fetchProducts()
        dispatch(getNewProducts())
    }, [])

    useEffect(() => {
        if (activedTab === 1) setProducts(bestSellers)
        if (activedTab === 2) setProducts(newProducts)
    }, [activedTab])
    return (
        <div>
            <div className='flex text-[20px] pb-4 ml[-32px]'>
                {tabs.map((el, index) => (
                    <span key={index} className={`font-semibold px-8 capitalize border-r text-gray-400 cursor-pointer ${activedTab === el.id ? 'text-gray-900' : ''}`} onClick={() => setActivedTab(el.id)}>{el.name}</span>
                ))}
            </div>
            <div className='mt-4 mx-[10px] border-t-2 border-main pt-4'>
                <CustomSlider products={products} activedTab={activedTab} />
            </div>
            <div className='w-full flex gap-4 mt-4'>
                <img className='flex-1 object-contain' src='https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657' alt='nhannt' />
                <img className='flex-1 object-contain' src='https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-home2_2000x_crop_center.png?v=1613166657' alt='nhannt' />
            </div>
        </div>
    )
}

export default BestSeller