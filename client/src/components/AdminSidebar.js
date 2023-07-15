import React, { Fragment, memo } from 'react'
import { logo } from '../assets'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { menuItems } from '../utils/constants'
import { Link } from 'react-router-dom'

const style = [
    {
        height: '100%'  // Sidebar
    },
    {
        color: 'black' // Menu
    }
]

const AdminSidebar = () => {
    return (
        <Sidebar className='' backgroundColor='#d7bfbf' rootStyles={style[0]}>
            <Link to='/' className='flex flex-col justify-center items-center gap-2 p-4'>
                <img src={logo} alt='nhannt-dev' className='w-[200px] object-contain' />
                <small className='text-black'>Workspace</small>
            </Link>
            <Menu rootStyles={style[1]}>
                {menuItems.map((el, index) => (
                    <Fragment key={index}>
                        {el.type === 'single' && !el.submenu ? <>
                            <MenuItem active icon={el.icon} component={<Link to={el.path} />}>{el.text}</MenuItem>
                        </> : <>
                            <SubMenu icon={el.icon} label={el.text}>
                                {el?.submenu?.map((sub, order) => (
                                    <MenuItem key={order} component={<Link to={sub.path} />}>{sub.text}</MenuItem>
                                ))}
                            </SubMenu>
                        </>}
                    </Fragment>
                ))}
            </Menu>
        </Sidebar>
    )
}

export default memo(AdminSidebar)