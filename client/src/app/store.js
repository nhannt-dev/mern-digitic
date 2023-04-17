import { configureStore } from '@reduxjs/toolkit'
import appSlice from './appSlice'
import productSlice from './productSlice'

export const store = configureStore({
  reducer: {
    app: appSlice,
    product: productSlice
  }
})