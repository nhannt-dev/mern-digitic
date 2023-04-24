import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null
    },
    reducers: {
        register: (state, action) => {
            console.log('action', action)
            state.isLoggedIn = action.payload.isLoggedIn
            state.current = action.payload.userData
            state.token = action.payload.token
        }

    },
    // extraReducers: (builder) => {
    //     builder.addCase(getNewProducts.pending, (state, action) => {
    //         state.isLoading = true
    //     })
    //     builder.addCase(getNewProducts.fulfilled, (state, action) => {
    //         state.isLoading = false
    //         state.newProducts = action.payload
    //     })
    //     builder.addCase(getNewProducts.rejected, (state, action) => {
    //         state.isLoading = false
    //     })
    // }
})

export const { register } = userSlice.actions

export default userSlice.reducer