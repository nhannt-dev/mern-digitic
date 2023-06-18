import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import path from '../../utils/path'
import { useSelector } from 'react-redux'

const { LOGIN } = path

const Layout = () => {
  const { isLoggedIn, current } = useSelector(state => state.user)
  if (!isLoggedIn || !current || +current.role !== 1) return <Navigate to={`/${LOGIN}`} replace={true} />

  return (
    <div>
      <div>admin</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout