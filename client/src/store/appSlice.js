import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asynsActions';

export const appSlice = createSlice({
    name: "app",
    initialState: {
        categories: [],
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(actions.getCategories.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(actions.getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(actions.getCategories.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default appSlice.reducer;
