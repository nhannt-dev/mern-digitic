import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import appSlice from './appSlice'
import productSlice from './productSlice'
import userSlice from './userSlice'
import { persistReducer, persistStore } from 'redux-persist'

const commonConfig = {
  key: 'shop/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token']
}

export const store = configureStore({
  reducer: {
    app: appSlice,
    product: productSlice,
    user: persistReducer(userConfig, userSlice)
  }
})

export const persistor =  persistStore(store)