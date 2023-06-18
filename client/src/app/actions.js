import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCategories, apiGetProducts, apiGetCurrent } from '../apis'

export const getCategories = createAsyncThunk('app/categories', async (data, { rejectWithValue }) => {
    const res = await apiGetCategories()
    if (!res.success) return rejectWithValue(res)
    return res.prodCategories
})

export const getNewProducts = createAsyncThunk('product/new', async (data, { rejectWithValue }) => {
    const res = await apiGetProducts({ sort: '-createdAt' })
    if (!res.success) return rejectWithValue(res)
    return res.products
})

export const getCurrent = createAsyncThunk('user/current', async (data, { rejectWithValue }) => {
    const res = await apiGetCurrent()
    if (!res.success) return rejectWithValue(res)
    return res?.rs
})