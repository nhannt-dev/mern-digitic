import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, Public, FAQ, Blogs, DetailProduct, Services, Products } from './pages/public'
import path from './utils/path'
import { getCategories } from './app/actions'
import { useDispatch } from 'react-redux'

const { HOME, LOGIN, PUBLIC, BLOGS, OUR_SERVICES, DETAIL_PRODUCT__PID__TITLE, PRODUCTS } = path

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div className='min-h-screen font-main'>
      <Routes>
        <Route path={PUBLIC} element={<Public />}>
          <Route path={HOME} element={<Home />} />
          <Route path={BLOGS} element={<Blogs />} />
          <Route path={PRODUCTS} element={<Products />} />
          <Route path={DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={OUR_SERVICES} element={<Services />} />
        </Route>
        <Route path={LOGIN} element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
