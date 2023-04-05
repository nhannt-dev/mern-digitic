import React, { useEffect, useState } from 'react'
import { apiGetProducts } from '../apis'
import { Product } from '../components'
import Slider from 'react-slick'

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

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
}

const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState(null)
    const [newProducts, setNewProducts] = useState(null)
    const [activedTab, setActivedTab] = useState(1)

    const fetchProducts = async () => {
        const response = await Promise.all([apiGetProducts({ sort: '-sold' }), apiGetProducts({ sort: '-createdAt' })])
        console.log('fetchProducts---->', response)
        if (response[0]?.success) setBestSellers(response[0].products)
        if (response[1]?.success) setNewProducts(response[1].products)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div>
            <div className='flex text-[20px] gap-8 pb-4 border-b-2 border-main'>
                {tabs.map(el => (
                    <span key={el.id} className={`font-semibold capitalize border-r text-gray-400 cursor-pointer ${activedTab === el.id ? 'text-gray-900' : ''}`} onClick={() => setActivedTab(el.id)}>{el.name}</span>
                ))}
            </div>
            <div className='mt-4'>
                <Slider {...settings}>
                    {bestSellers?.map(el => (
                        <Product key={el.id} productData={el} />
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default BestSeller