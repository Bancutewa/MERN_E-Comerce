import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asynsActions';

export const productSlice = createSlice({
    name: "products",
    initialState: {
        newProducts: [],
        isLoading: false,
        errorMessage: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(actions.getNewProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.newProducts = action.payload;
            })
            .addCase(actions.getNewProducts.pending, (state, actions) => {
                state.isLoading = true;
            })
            .addCase(actions.getNewProducts.rejected, (state, actions) => {
                state.isLoading = false;
                state.errorMessage = actions.payload.message
            });
    }
});

export default productSlice.reducer;
