import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import appSlice from './appSlice'
import productSlice from './productSlice'
import userSlice from './userSlice'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const commonConfig = {
  key: 'shop/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token', 'current']
}

export const store = configureStore({
  reducer: {
    app: appSlice,
    product: productSlice,
    user: persistReducer(userConfig, userSlice)
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

export const persistor = persistStore(store)