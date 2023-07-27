import React, { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '.'
import icons from '../utils/icons'
import { Button, Loading } from '.'
import { getBase64 } from '../utils/helpers'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { showModal } from '../app/appSlice'
import { apiCreateVariantsProduct } from '../apis'
import { useNavigate } from 'react-router-dom'

const { BiTrash } = icons

const Variants = ({ variants, reRender, setVariants }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    const [hover, setHover] = useState(null)

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

    useEffect(() => {
        handlePreview(watch('thumb')[0])
    }, [watch('thumb')])

    useEffect(() => {
        handlePreviews(watch('images'))
    }, [watch('images')])

    useEffect(() => {
        reset({
            title: variants?.title
        })
    }, [variants])

    const handleRemove = (name) => {
        const files = [...watch('images')]
        reset({ images: files?.filter(el => el?.name !== name) })
        if (preview.images?.some(el => el?.name === name)) setPreview(rest => ({ ...rest, images: rest.images?.filter(el => el.name !== name) }))
    }

    const handleAddVariants = async (data) => {
        let formData = new FormData()
        for (let i of Object.entries(data)) formData.append(i[0], i[1])
        if (data.thumb) formData.append('thumb', data.thumb[0])
        if (data.images) for (let image of data.images) formData.append('images', image)
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
        const res = await apiCreateVariantsProduct(formData, variants?._id)
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
        if (res?.success) {
            toast.success(res?.mes)
            reRender()
            setVariants(null)
        } else toast.error(res?.mes)
    }

    return (
        <div className='w-full flex flex-col gap-4 relative'>
            <div className='bg-gray-100 pt-[29px] p-4 border-b w-[86%] flex fixed justify-between items-center right-0'>
                <h1 className='text-3xl font-bold tracking-tight'>Variants Product</h1>
                <span className='text-white bg-main p-3 rounded-md hover:bg-[#f54949] cursor-pointer' onClick={() => setVariants(null)}>Cancel</span>
            </div>
            <form className='mt-[90px] p-4 w-full' onSubmit={handleSubmit(handleAddVariants)}>
                <Form readOnly none disabled label='Title' register={register} errors={errors} id='title' style='flex-auto' />
                <div className='w-full my-6 flex gap-4'>
                    <Form type='number' label='Price' register={register} errors={errors} id='price' style='flex-auto' />
                    <Form label='Color' register={register} errors={errors} id='color' style='flex-auto' />
                </div>
                <div className='flex flex-col gap-2 mt-8'>
                    <label htmlFor='thumb' className='font-semibold'>Upload Thumb</label>
                    <input type='file' id='thumb' {...register('thumb')} />
                    {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
                </div>
                {preview.thumb && <div className='my-4'>
                    <img src={preview.thumb} alt='nhannt-dev' className='w-[200px] object-contain' />
                </div>}
                <div className='flex flex-col gap-2 mb-6 mt-8'>
                    <label htmlFor='images' className='font-semibold'>Upload Images</label>
                    <input type='file' id='images' multiple {...register('images')} />
                    {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
                </div>
                {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>
                    {preview.images.map((el, index) => (
                        <div onMouseEnter={() => setHover(el?.name)} onMouseLeave={() => setHover(null)} className='w-fit relative h-full' key={index}>
                            <img src={el?.path} alt='nhannt-dev' className='w-[200px] object-cover h-full' />
                            {hover === el?.name && <div className='absolute animate-scale-up-center inset-0 bg-overlay flex justify-end'>
                                <BiTrash color='#fff' size={20} className='mx-4 my-1 cursor-pointer' onClick={() => handleRemove(el?.name)} />
                            </div>}
                        </div>
                    ))}
                </div>}
                <Button type='submit' name='Create Variants' />
            </form>
        </div>
    )
}

export default memo(Variants)