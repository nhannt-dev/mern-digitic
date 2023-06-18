import React, { useCallback, useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumb, Product, SearchItem, SelectField, Pagination } from '../../components'
import { apiGetProducts } from '../../apis'
import Masonry from 'react-masonry-css'
import { sortBy } from '../../utils/constants'

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
}

const Products = () => {
  const { category } = useParams()
  const navigate = useNavigate()

  const [products, setProducts] = useState(null)
  const [active, setActive] = useState(null)
  const [sorts, setSorts] = useState('')
  const [params] = useSearchParams()

  const fetchProducts = async (queries) => {
    const res = await apiGetProducts(queries)
    if (res?.success) setProducts(res)
  }

  const changeValue = useCallback((value) => {
    setSorts(value)
  }, [sorts])

  const changeActive = useCallback((name) => {
    if (active === name) setActive(null)
    else setActive(name)
  }, [active])

  useEffect(() => {
    let param = []
    let queries = {}
    let prQ = {}
    for (let i of params.entries()) param.push(i)
    for (const i of params) queries[i[0]] = i[1]
    if (queries.from) queries.price = { gte: queries.from }
    if (queries.to) queries.price = { gte: queries.to }
    if (queries.from && queries.to) {
      prQ = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } }
        ]
      }
      delete queries.price
    } else {
      if(queries.from) queries.price = {gte: queries.from}
      if(queries.to) queries.price = {gte: queries.to}
    }
    delete queries.from
    delete queries.to
    fetchProducts({ ...prQ, ...queries })
  }, [params])

  useEffect(() => {
    if (sorts) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({ sort: sorts }).toString()
      })
    }
  }, [sorts])
  window.scrollTo(0, 0)
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
        <div className='w-1/5 flex flex-col gap-3'>
          <span className='font-semibold text-sm'>Sort by:</span>
          <div className='w-full'>
            <SelectField value={sorts} changeValue={changeValue} options={sortBy} />
          </div>
        </div>
      </div>
      <div className='mt-8 w-main m-auto'>
        <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid flex mx-[-10px]" columnClassName="my-masonry-grid_column">
          {products?.products?.map((el, index) => (
            <Product key={index} productData={el} normal />
          ))}
        </Masonry>
      </div>
      <div className='w-main m-auto my-4 flex justify-end'>
        <Pagination total={products?.counts} />
      </div>
      <div className='w-full h-[500px]'>
        footer
      </div>
    </div>
  )
}

export default Products