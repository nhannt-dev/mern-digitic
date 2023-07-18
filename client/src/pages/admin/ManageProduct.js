import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Pagination } from '../../components'
import { apiGetProducts } from '../../apis'
import moment from 'moment'
import { useSearchParams } from 'react-router-dom'
import useDebounce from '../../utils/debounce'

const ManageProduct = () => {
  const [params] = useSearchParams()
  const { register, formState: { errors }, reset, handleSubmit, watch } = useForm()
  let debounce = useDebounce(watch('q'), 500)
  const [products, setProducts] = useState(null)
  const [counts, setCounts] = useState(0)

  const fetchProducts = async (params) => {
    const res = await apiGetProducts({ ...params, limit: 10 })
    if (res?.success) {
      setProducts(res?.products)
      setCounts(res?.counts)
    }
  }

  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    if (debounce) searchParams.q = debounce
    fetchProducts(searchParams)
  }, [params, debounce])


  return (
    <div className='w-full flex flex-col gap-4 relative'>
      <div className='bg-gray-100 pt-[29px] p-4 border-b w-full flex fixed justify-between items-center'>
        <h1 className='text-3xl font-bold tracking-tight'>Manage Products</h1>
      </div>
      <div className='flex w-full pt-[29px] justify-end items-center z-10 px-4'>
        <form className='w-[25%]'>
          <Form id='q' register={register} errors={errors} fullWith placeholder='Tìm kiếm sản phẩm...' />
        </form>
      </div>
      <table className='table-auto'>
        <thead>
          <tr className='bg-main text-white'>
            <th>#</th>
            <th>Thumb</th>
            <th>Title</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price (VND)</th>
            <th>Quantity</th>
            <th>Sold</th>
            <th>Color</th>
            <th>Ratings</th>
            <th>Date created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((el, index) => (
            <tr key={el?._id}>
              <td className='text-center'>{((params.get('page') > 1 ? params.get('page') - 1 : 0) * 10) + ++index}</td>
              <td className='flex justify-center'>
                <img src={el?.thumb} alt='nhannt-dev' className='w-12 h-12 object-cover' />
              </td>
              <td className='text-center'>{el?.title}</td>
              <td className='text-center'>{el?.brand}</td>
              <td className='text-center'>{el?.category}</td>
              <td className='text-center'>{el?.price}</td>
              <td className='text-center'>{el?.quantity}</td>
              <td className='text-center'>{el?.sold}</td>
              <td className='text-center'>{el?.color}</td>
              <td className='text-center'>{el?.totalRatings}</td>
              <td className='text-center'>{moment(el?.createdAt).format('DD/MM/YYYY')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-full flex justify-end my-8'>
        <Pagination total={counts} />
      </div>
    </div>
  )
}

export default ManageProduct