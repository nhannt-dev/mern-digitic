import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, Select, Button } from '../../components'
import { useSelector } from 'react-redux'

const CreateProduct = () => {
  const { categories } = useSelector(state => state.app)
  const { register, formState: { errors }, reset, handleSubmit, watch } = useForm({
    category: ''
  })

  const handleCreateProd = (data) => {
    if(data?.category) data.category = categories?.find(el => el._id === data.category)?.title
    console.log(data)
  }

  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b capitalize'>create new product</h1>
      <div className='p-4'>
        <form onSubmit={handleSubmit(handleCreateProd)}>
          <Form label='Product Name' register={register} errors={errors} id='title' fullWith validate={{ required: 'Vui long nhap day du thong tin' }} placeholder='Product Name' />
          <div className='w-full my-6 flex gap-4'>
            <Form label='Price' register={register} errors={errors} id='price' style='flex-auto' validate={{ required: 'Vui long nhap day du thong tin' }} placeholder='Product Price' type='number' />
            <Form label='Quantity' register={register} errors={errors} id='quantity' style='flex-auto' validate={{ required: 'Vui long nhap day du thong tin' }} placeholder='Product Quantity' type='number' />
            <Form label='Color' register={register} errors={errors} id='color' style='flex-auto' validate={{ required: 'Vui long nhap day du thong tin' }} placeholder='Product Color' />
          </div>
          <div className='w-full my-6 flex gap-4'>
            <Select label='Category' options={categories?.map(el => ({ code: el?._id, value: el?.title }))} register={register} id='category' validate={{ required: 'Vui long nhap day du thong tin' }} style='flex-auto' errors={errors} />
            <Select label='Brand' options={categories?.find(el => el._id === watch('category'))?.brand?.map(el => ({ code: el, value: el }))} register={register} id='brand' style='flex-auto' errors={errors} />
          </div>
          <Button type='submit' name='Create' />
        </form>
      </div>
    </div>
  )
}

export default CreateProduct