import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Button } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { apiUpdateProfileUser } from '../../apis'
import { getCurrent } from '../../app/actions'
import { toast } from 'react-toastify'
import path from '../../utils/path'
import { useNavigate } from 'react-router-dom'

const { HOME } = path

const Profile = () => {
    const { register, formState: { errors, isDirty }, reset, handleSubmit } = useForm()
    const { current } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        reset({
            firstname: current?.firstname,
            lastname: current?.lastname,
            email: current?.email,
            mobile: current?.mobile
        })
    }, [])

    const handleUpdateProfile = async (data) => {
        const res = await apiUpdateProfileUser(data)
        if (res?.success) {
            dispatch(getCurrent())
            toast.success(res?.mes)
            navigate(`/${HOME}`)
        }
    }

    return (
        <div className='w-full relative px-4'>
            <header className='text-3xl font-semibold py-4 border-b border-blue-200'>Profile</header>
            <form onSubmit={handleSubmit(handleUpdateProfile)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
                <Form label='Firstname' register={register} errors={errors} id='firstname' validate={{ required: 'Vui lòng nhập đầy đủ thông tin!' }} />
                <Form label='Lastname' register={register} errors={errors} id='lastname' validate={{ required: 'Vui lòng nhập đầy đủ thông tin!' }} />
                <Form label='Email' register={register} errors={errors} id='email' validate={{
                    required: 'Vui lòng nhập đầy đủ thông tin!', pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: 'Email không hợp lệ'
                    }
                }} />
                <Form label='Mobile' register={register} errors={errors} id='mobile' validate={{
                    required: 'Vui lòng nhập đầy đủ thông tin!', pattern: {
                        value: /^\d{10}$/,
                        message: 'Số điện thoại không hợp lệ!'
                    }
                }} />
                {isDirty && <Button name='Update Profile' type='submit' />}
            </form>
        </div>
    )
}

export default Profile