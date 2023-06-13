import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, Public, FAQ, Blogs, DetailProduct, Services, Products, FinalRegister, ResetPassword } from './pages/public'
import path from './utils/path'
import { getCategories } from './app/actions'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Modal } from './components'

const { HOME, LOGIN, PUBLIC, BLOGS, OUR_SERVICES, DETAIL_PRODUCT__CATEGORY__PID__TITLE, PRODUCTS, FINAL_REGISTER, RESET_PASSWORD } = path

function App() {
  const dispatch = useDispatch()
  const { isShowModal, modalChildren } = useSelector(state => state.app)
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div className='font-main relative'>
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={PUBLIC} element={<Public />}>
          <Route path={HOME} element={<Home />} />
          <Route path={BLOGS} element={<Blogs />} />
          <Route path={PRODUCTS} element={<Products />} />
          <Route path={DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={OUR_SERVICES} element={<Services />} />
          <Route path={RESET_PASSWORD} element={<ResetPassword />} />
        </Route>
        <Route path={FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={LOGIN} element={<Login />} />
      </Routes>
      <ToastContainer position='top-right' autoClose={800} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
    </div>
  )
}

export default App
