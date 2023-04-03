import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from './actions'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: null,
        isLoading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false
            state.categories = action.payload
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false
        })
    }
})

export const {  } = appSlice.actions

export default appSlice.reducer