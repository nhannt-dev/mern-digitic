import { createSlice } from '@reduxjs/toolkit'
import { getCurrent } from './actions'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
        mes: ''
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },

        logout: (state, action) => {
            state.isLoggedIn = false
            state.token = null
            state.current = null
            state.isLoading = false
            state.mes = ''
        },
        clearMes: (state, action) => {
            state.mes = 'Phiên đăng nhập hết hạn'
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrent.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getCurrent.fulfilled, (state, action) => {
            state.isLoading = false
            state.current = action.payload
            state.isLoggedIn = true
        })

        builder.addCase(getCurrent.rejected, (state, action) => {
            state.isLoading = false
            state.current = null
            state.isLoggedIn = false
            state.token = null
        })

    }

})

export const { login, logout, clearMes } = userSlice.actions

export default userSlice.reducer