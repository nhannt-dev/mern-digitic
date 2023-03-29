import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, Public } from './pages/public'
import path from './utils/path'

const { HOME, LOGIN, PUBLIC } = path

function App() {
  return (
    <div className='min-h-screen font-main'>
      <Routes>
        <Route path={PUBLIC} element={<Public />}>
          <Route path={HOME} element={<Home />} />
          <Route path={LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
