import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCategories, apiGetProducts, apiGetCurrent } from '../apis'

export const getCategories = createAsyncThunk('app/categories', async (data, { rejectWithValue }) => {
    const response = await apiGetCategories()
    if (!response.success) return rejectWithValue(response)
    return response.prodCategories
})

export const getNewProducts = createAsyncThunk('product/new', async (data, { rejectWithValue }) => {
    const response = await apiGetProducts({ sort: '-createdAt' })
    if (!response.success) return rejectWithValue(response)
    return response.products
})

export const getCurrent = createAsyncThunk('user/current', async (data, { rejectWithValue }) => {
    const response = await apiGetCurrent()
    if (!response.success) return rejectWithValue(response)
    return response?.rs
})