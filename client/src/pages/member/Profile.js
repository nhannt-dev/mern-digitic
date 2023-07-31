import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Button } from '../../components'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { register, formState: { errors }, reset, handleSubmit } = useForm()
    const { current } = useSelector(state => state.user)
    const handleUpdateProfile = (data) => console.log(data)
    useEffect(() => {
        reset({
            firstname: current?.firstname,
            lastname: current?.lastname,
            email: current?.email,
            mobile: current?.mobile
        })

    }, [])

    return (
        <div className='w-full relative px-4'>
            <header className='text-3xl font-semibold py-4 border-b border-blue-200'>Profile</header>
            <form onSubmit={handleSubmit(handleUpdateProfile)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
                <Form label='Firstname' register={register} errors={errors} id='firstname' validate={{ required: 'Vui lòng nhập đầy đủ thông tin!' }} />
                <Form label='Lastname' register={register} errors={errors} id='lastname' validate={{ required: 'Vui lòng nhập đầy đủ thông tin!' }} />
                <Form label='Email' register={register} errors={errors} id='email' validate={{ required: 'Vui lòng nhập đầy đủ thông tin!' }} />
                <Form label='Mobile' register={register} errors={errors} id='mobile' validate={{ required: 'Vui lòng nhập đầy đủ thông tin!' }} />
                <Button name='Update Profile' type='submit' />
            </form>
        </div>
    )
}

export default Profile