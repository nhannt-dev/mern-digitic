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
    const [products, setProducts] = useState(null)

    const fetchProducts = async () => {
        const response = await Promise.all([apiGetProducts({ sort: '-sold' }), apiGetProducts({ sort: '-createdAt' })])
        if (response[0]?.success) setBestSellers(response[0].products)
        if (response[1]?.success) setNewProducts(response[1].products)
        setProducts(response[0].products)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        if(activedTab === 1) setProducts(bestSellers)
        if(activedTab === 2) setProducts(newProducts)
    }, [activedTab])
    return (
        <div>
            <div className='flex text-[20px] pb-4 ml[-32px]'>
                {tabs.map((el, index) => (
                    <span key={index} className={`font-semibold px-8 capitalize border-r text-gray-400 cursor-pointer ${activedTab === el.id ? 'text-gray-900' : ''}`} onClick={() => setActivedTab(el.id)}>{el.name}</span>
                ))}
            </div>
            <div className='mt-4 mx-[10px] border-t-2 border-main pt-4'>
                <Slider {...settings}>
                    {products?.map((el, index) => (
                        <Product key={index} productData={el} isNew={activedTab === 1 ? true : false}/>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default BestSeller