import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import path from '../../utils/path'
import { useSelector } from 'react-redux'

const { LOGIN } = path

const Layout = () => {
    const { isLoggedIn, current } = useSelector(state => state.user)
    if (!isLoggedIn || !current) return <Navigate to={`/${LOGIN}`} replace={true} />

    return (
        <div>
            slfjvsdjhfij
            <Outlet />
        </div>
    )
}

export default Layout