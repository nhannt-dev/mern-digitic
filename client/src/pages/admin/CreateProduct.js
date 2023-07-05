import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Select, Button, Markdown } from '../../components'
import { useSelector } from 'react-redux'
import { validate } from '../../utils/helpers'

const CreateProduct = () => {
  const { categories } = useSelector(state => state.app)

  const { register, formState: { errors }, reset, handleSubmit, watch } = useForm({
    category: ''
  })

  const [payload, setPayload] = useState({
    description: ''
  })
  const [invalid, setInvalid] = useState([])

  const changeValue = useCallback((e) => {
    setPayload(e)
  }, [payload])


  const handleCreateProd = (data) => {
    const invalids = validate(payload, setInvalid)
    if (invalids === 0) {
      if (data?.category) data.category = categories?.find(el => el._id === data.category)?.title
      const fData = { ...data, ...payload }
      const formData = new FormData()
      for (let i of Object.entries(fData)) formData.append(i[0], i[1])
    }
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
          <Markdown name='description' changeValue={changeValue} invalid={invalid} setInvalid={setInvalid} label='Description' />
          <div className='flex flex-col gap-2 mt-8'>
            <label htmlFor='thumb' className='font-semibold'>Upload Thumb</label>
            <input type='file' id='thumb' {...register('thumb', { required: 'Vui long nhap day du thong tin!' })} />
            {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
          </div>
          <div className='flex flex-col gap-2 mb-6 mt-8'>
            <label htmlFor='images' className='font-semibold'>Upload Images</label>
            <input type='file' id='images' multiple {...register('images', { required: 'Vui long nhap day du thong tin' })} />
            {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
          </div>
          <Button type='submit' name='Create' />
        </form>
      </div>
    </div>
  )
}

export default CreateProduct