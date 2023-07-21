import React, { memo, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Loading, Markdown, Select } from '../../components'
import { apiCreateProduct } from '../../apis'
import icons from '../../utils/icons'
import path from '../../utils/path'
import { getBase64, validate } from '../../utils/helpers'
import { toast } from 'react-toastify'
import { showModal } from '../../app/appSlice'

const { BiTrash } = icons
const { ADMIN, MANAGE_PRODUCTS } = path

const UpdateProduct = ({ edit, reRender }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { categories } = useSelector(state => state.app)

    const { register, formState: { errors }, reset, handleSubmit, watch } = useForm({
        category: ''
    })

    const [payload, setPayload] = useState({
        description: ''
    })
    const [invalid, setInvalid] = useState([])
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    const [hover, setHover] = useState(null)

    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])


    const handleCreateProd = async (data) => {
        const invalids = validate(payload, setInvalid)
        if (invalids === 0) {
            if (data?.category) data.category = categories?.find(el => el._id === data.category)?.title
            const fData = { ...data, ...payload }
            let formData = new FormData()
            for (let i of Object.entries(fData)) formData.append(i[0], i[1])
            if (fData.thumb) formData.append('thumb', fData.thumb[0])
            if (fData.images) {
                for (let image of fData.images) formData.append('images', image)
            }
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const res = await apiCreateProduct(formData)
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
            if (res?.success) {
                toast.success(res?.mes)
                reset()
                setPreview({ thumb: null, images: [] })
                navigate(`/${ADMIN}/${MANAGE_PRODUCTS}`)
            } else toast.error(res?.mes)
        }
    }

    const handlePreview = async (file) => {
        const base64Thumb = await getBase64(file)
        setPreview(rest => ({ ...rest, thumb: base64Thumb }))
    }

    const handlePreviews = async (files) => {
        let images = []
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                toast.warning('Không hỗ trợ định dạng file này!')
                return
            }
            const base64 = await getBase64(file)
            images.push({ name: file.name, path: base64 })
        }
        if (images.length > 0) setPreview(rest => ({ ...rest, images }))
    }

    const handleRemove = (name) => {
        const files = [...watch('images')]
        reset({ images: files?.filter(el => el?.name !== name) })
        if (preview.images?.some(el => el?.name === name)) setPreview(rest => ({ ...rest, images: rest.images?.filter(el => el.name !== name) }))
    }

    useEffect(() => {
        handlePreview(watch('thumb')[0])
    }, [watch('thumb')])

    useEffect(() => {
        handlePreviews(watch('images'))
    }, [watch('images')])

    useEffect(() => {
        reset({
            title: edit?.title ?? '',
            price: edit?.price ?? '',
            quantity: edit?.quantity ?? '',
            color: edit?.color ?? '',
            category: edit?.category ?? '',
            brand: edit?.brand?.toLowerCase() ?? ''
        })
        setPayload({ description: typeof edit?.description === 'object' ? edit?.description?.join(', ') : edit?.description })
        setPreview({
            thumb: edit?.thumb || '',
            images: edit?.images || []
        })
    }, [edit])

    console.log(edit?.thumb)

    return (
        <div className='w-full flex flex-col gap-4 relative'>
            <div className='bg-gray-100 pt-[29px] p-4 border-b w-full flex fixed justify-between items-center'>
                <h1 className='text-3xl font-bold tracking-tight'>Update Product</h1>
            </div>
            <div className='p-4 mt-[90px]'>
                <form onSubmit={handleSubmit(handleCreateProd)}>
                    <Form label='Product Name' register={register} errors={errors} id='title' fullWith validate={{ required: 'Vui long nhap day du thong tin' }} placeholder='Product Name' />
                    <div className='w-full my-6 flex gap-4'>
                        <Form label='Price' register={register} errors={errors} id='price' style='flex-auto' validate={{ required: 'Vui long nhap day du thong tin' }} placeholder='Product Price' type='number' />
                        <Form label='Quantity' register={register} errors={errors} id='quantity' style='flex-auto' validate={{ required: 'Vui long nhap day du thong tin' }} placeholder='Product Quantity' type='number' />
                        <Form label='Color' register={register} errors={errors} id='color' style='flex-auto' validate={{ required: 'Vui long nhap day du thong tin' }} placeholder='Product Color' />
                    </div>
                    <div className='w-full my-6 flex gap-4'>
                        <Select label='Category' options={categories?.map(el => ({ code: el?.title, value: el?.title }))} register={register} id='category' validate={{ required: 'Vui long nhap day du thong tin' }} style='flex-auto' errors={errors} />
                        <Select label='Brand' options={categories?.find(el => el.title === watch('category'))?.brand?.map(el => ({ code: el?.toLowerCase(), value: el }))} register={register} id='brand' style='flex-auto' errors={errors} />
                    </div>
                    <Markdown name='description' changeValue={changeValue} invalid={invalid} setInvalid={setInvalid} label='Description' value={payload.description} />
                    <div className='flex flex-col gap-2 mt-8'>
                        <label htmlFor='thumb' className='font-semibold'>Upload Thumb</label>
                        <input type='file' id='thumb' {...register('thumb', { required: 'Vui long nhap day du thong tin!' })} />
                        {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
                    </div>
                    {edit.thumb && <div className='my-4'>
                        <img src={edit.thumb} alt='nhannt-dev' className='w-[200px] object-contain' />
                    </div>}
                    <div className='flex flex-col gap-2 mb-6 mt-8'>
                        <label htmlFor='images' className='font-semibold'>Upload Images</label>
                        <input type='file' id='images' multiple {...register('images', { required: 'Vui long nhap day du thong tin' })} />
                        {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
                    </div>
                    {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>
                        {preview.images.map((el, index) => (
                            <div onMouseEnter={() => setHover(el?.name)} onMouseLeave={() => setHover(null)} className='w-fit relative h-full' key={index}>
                                <img src={el} alt='nhannt-dev' className='w-[200px] object-cover h-full' />
                                {hover === el?.name && <div className='absolute animate-scale-up-center inset-0 bg-overlay flex justify-end'>
                                    <BiTrash color='#fff' size={20} className='mx-4 my-1 cursor-pointer' onClick={() => handleRemove(el?.name)} />
                                </div>}
                            </div>
                        ))}
                    </div>}
                    <Button type='submit' name='Update' />
                </form>
            </div>
        </div>
    )
}

export default memo(UpdateProduct)