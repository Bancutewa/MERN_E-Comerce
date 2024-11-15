import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis"
export const getNewProducts = createAsyncThunk(
    'products/getProducts',
    async (data, { rejectWithValue }) => {
        const response = await apis.apiGetProducts({ sort: '-createdAt' });
        if (!response.success) return rejectWithValue(response.error);
        return response.productsDatas;
    }
)