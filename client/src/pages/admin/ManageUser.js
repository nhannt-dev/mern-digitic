import React, { useCallback, useEffect, useState } from 'react'
import { apiGetUsers, apiUpdateUser, apiDeleteUser } from '../../apis'
import moment from 'moment'
import useDebounce from '../../utils/debounce'
import { Pagination, Form, Select, Button } from '../../components'
import { useForm } from 'react-hook-form'

const ManageUser = () => {
  const [users, setUsers] = useState(null)
  const [kw, setKw] = useState('')
  const [editItem, setEditItem] = useState(null)
  const [render, setRender] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    email: '',
    firstname: '',
    lastname: '',
    role: '',
    phone: '',
    status: ''
  })

  const fetchUsers = async () => {
    const res = await apiGetUsers()
    if (res?.success) setUsers(res)
  }

  const kwDebounce = useDebounce(kw, 500)

  useEffect(() => {
    let params = {}
    if (kwDebounce) params.q = kwDebounce
    fetchUsers(params)
  }, [kwDebounce, render])

  const update = useCallback(() => {
    setRender(render)
  }, [render])

  const handleUpdate = async (data) => {
    const res = await apiUpdateUser(data, editItem?._id)
    if (res?.success) {
      setEditItem(null)
      update()
    }
  }

  const handleDelete = async (id) => {
    const res = await apiDeleteUser(id)
    if(res.success) update()
  }

  return (
    <div className='w-full pl-2'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Manage User</span>
      </h1>
      <div className='w-full p-4'>
        <div className='flex justify-end py-4'>
          <div className='bg-white w-[300px] h-[37px] rounded-md flex items-center px-3'>
            <input value={kw} onChange={e => setKw(e.target.value)} className='w-full outline-none' placeholder='Search for mobile or email' />
          </div>
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {editItem && <Button name='Update' type='submit' />}
          <table className='w-full table-auto mb-6 text-left'>
            <thead className='font-bold bg-gray-300 text-[13px] border border-gray-300 text-center'>
              <th className='px-4 py-2'>#</th>
              <th className='px-4 py-2'>Email Address</th>
              <th className='px-4 py-2'>Firstname</th>
              <th className='px-4 py-2'>Lastname</th>
              <th className='px-4 py-2'>Role</th>
              <th className='px-4 py-2'>Phone</th>
              <th className='px-4 py-2'>Status</th>
              <th className='px-4 py-2'>Created At</th>
              <th className='px-4 py-2'>Actions</th>
            </thead>
            <tbody>
              {users?.users?.map((el, index) => (
                <tr key={index} className='border border-gray-300 text-center'>
                  <td className='py-2 px-4'>{++index}</td>
                  <td className='py-2 px-4'>{editItem?._id === el._id ? <Form fullWith defaultValue={editItem?.email} id='email' validate={{
                    required: true, pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Invalid your email'
                    }
                  }} errors={errors} register={register} /> : el?.email}</td>
                  <td className='py-2 px-4'>{editItem?._id === el._id ? <Form fullWith defaultValue={editItem?.firstname} id='firstname' validate={{ required: true }} errors={errors} register={register} /> : el?.firstname}</td>
                  <td className='py-2 px-4'>{editItem?._id === el._id ? <Form fullWith defaultValue={editItem?.lastname} id='lastname' validate={{ required: true }} errors={errors} register={register} /> : el?.lastname}</td>
                  <td className='py-2 px-4'>{editItem?._id === el?._id ? <Select /> : +el.role === 1 ? 'Admin' : 'User'}</td>
                  <td className='py-2 px-4'>{editItem?._id === el._id ? <Form fullWith defaultValue={editItem?.mobile} id='mobile' validate={{ required: true }} errors={errors} register={register} /> : el?.mobile}</td>
                  <td className='py-2 px-4'>{editItem?._id === el?._id ? <Select /> : el.isBlocked ? 'Blocked' : 'Actived'}</td>
                  <td className='py-2 px-4'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                  <td className='py-2 px-4 flex gap-4'>
                    {!editItem ? <span onClick={() => setEditItem(el)} className='cursor-pointer border px-4 py-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-400'>Edit</span> : <span onClick={() => setEditItem(null)} className='cursor-pointer border px-4 py-1 rounded-md bg-cyan-500 text-white hover:bg-cyan-400-400'>Cancel</span>}
                    <span onClick={() => handleDelete(el?._id)} className='cursor-pointer border px-4 py-1 rounded-md bg-red-500 text-white hover:bg-red-400'>Delete</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
        <div className='flex justify-end w-full'>
          <Pagination total={users?.counts} />
        </div>
      </div>
    </div>
  )
}

export default ManageUser