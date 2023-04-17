import { createSlice } from '@reduxjs/toolkit'
import { getNewProducts } from './actions'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProducts: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNewProducts.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getNewProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.newProducts = action.payload
        })
        builder.addCase(getNewProducts.rejected, (state, action) => {
            state.isLoading = false
        })
    }
})

export default productSlice.reducer