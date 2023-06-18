import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { apiGetProducts } from '../apis'
import { asus, gear3, olloclip, sale } from '../assets'

const Feature = () => {
    const [products, setProducts] = useState(null)
    const fetchProducts = async () => {
        const res = await apiGetProducts({ limit: 9, totalRatings: 5 })
        if (res.success) setProducts(res.products)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className='w-full'>
            <h3 className='uppercase text-[20px] font-semibold py-[15px] border-b-2 border-main'>featured products</h3>
            <div className='flex flex-wrap mx-[-10px]'>
                {products?.map(el => (
                    <ProductCard key={el?.id} thumb={el?.thumb} title={el?.title} totalRatings={el?.totalRatings} price={el?.price} />
                ))}
            </div>
            <div className='flex justify-between'>
                <img src={asus} alt='nhannt' className='w-[600px]' />
                <div className='flex flex-col justify-between'>
                    <img src={gear3} alt='nhannt' className='w-[290px]' />
                    <img src={sale} alt='nhannt' className='w-[290px]' />
                </div>
                <img src={olloclip} alt='nhannt' className='w-[280px]' />
            </div>
        </div>
    )
}

export default Feature