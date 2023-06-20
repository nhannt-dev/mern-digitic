import React, { useEffect, useState } from 'react'
import { apiGetUsers } from '../../apis'
import moment from 'moment'

const ManageUser = () => {
  const [users, setUsers] = useState(null)
  const fetchUsers = async (params) => {
    const res = await apiGetUsers(params)
    if (res?.success) setUsers(res)
    console.log(res);
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Manage User</span>
      </h1>
      <div className='w-full p-4'>
        <table className='w-full table-auto mb-6 text-left'>
          <thead className='font-bold bg-gray-300 text-[13px] border border-gray-300 text-center'>
            <th className='px-4 py-2'>#</th>
            <th className='px-4 py-2'>Email Address</th>
            <th className='px-4 py-2'>Fullname</th>
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
                <td className='py-2 px-4'>{el?.email}</td>
                <td className='py-2 px-4'>{`${el?.firstname} ${el?.lastname}`}</td>
                <td className='py-2 px-4'>{+el.role === 1 ? 'Admin' : 'User'}</td>
                <td className='py-2 px-4'>{el?.mobile}</td>
                <td className='py-2 px-4'>{el.isBlocked ? 'Blocked' : 'Actived'}</td>
                <td className='py-2 px-4'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                <td className='py-2 px-4 flex gap-4'>
                  <span className='cursor-pointer border px-4 py-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-400'>Edit</span>
                  <span className='cursor-pointer border px-4 py-1 rounded-md bg-red-500 text-white hover:bg-red-400'>Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUser