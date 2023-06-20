import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import path from '../../utils/path'
import { useSelector } from 'react-redux'
import { AdminSidebar } from '../../components'

const { LOGIN } = path

const Layout = () => {
  const { isLoggedIn, current } = useSelector(state => state.user)
  if (!isLoggedIn || !current || +current.role !== 1) return <Navigate to={`/${LOGIN}`} replace={true} />

  return (
    <div className='flex w-full min-h-screen relative'>
      <div className='w-[250px] flex-none fixed top-0 bottom-0'>
        <AdminSidebar />
      </div>
      <div className='w-[250px]'></div>
      <div className='flex-auto bg-[#f5f1f1]'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout