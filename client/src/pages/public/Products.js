import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumb, Product, SearchItem } from '../../components'
import { apiGetProducts } from '../../apis'
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
}

const Products = () => {
  const { category } = useParams()

  const [products, setProducts] = useState(null)
  const [active, setActive] = useState(null)
  const [params] = useSearchParams()

  const fetchProducts = async (queries) => {
    const response = await apiGetProducts(queries)
    if (response?.success) setProducts(response?.products)
  }

  const changeActive = useCallback((name) => {
    if (active === name) setActive(null)
    else setActive(name)
  }, [active])

  useEffect(() => {
    let param = []
    let queries = {}
    for (let i of params.entries()) param.push(i)
    for (const i of params) queries[i[0]] = i[1]
    console.log(queries.color)
    fetchProducts(queries)
  }, [params])
  return (
    <div className='w-full'>
      <div className='h-[81px] flex justify-center items-center bg-gray-100'>
        <div className='w-main'>
          <h3 className=' font-semibold uppercase'>{category}</h3>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className='mt-8 m-auto w-main border p-4 flex justify-between'>
        <div className='w-4/5 flex-col flex-auto flex gap-3'>
          <span className='font-semibold text-sm'>Filter By</span>
          <div className='flex items-center gap-4'>
            <SearchItem name='price' actived={active} changeActive={changeActive} type='input' />
            <SearchItem name='color' actived={active} changeActive={changeActive} />
          </div>
        </div>
        <div className='w-1/5'>saklkdm</div>
      </div>
      <div className='mt-8 w-main m-auto'>
        <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid flex mx-[-10px]" columnClassName="my-masonry-grid_column">
          {products?.map((el, index) => (
            <Product key={index} productData={el} normal />
          ))}
        </Masonry>
      </div>
      <div className='w-full h-[500px]'>
        footer
      </div>
    </div>
  )
}

export default Products