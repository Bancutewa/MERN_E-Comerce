import { createSlice } from "@reduxjs/toolkit";
// import * as actions from './asynsActions';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null
    },
    reducers: {
        register: (state, action) => {
            console.log(action);

            state.isLoggedIn = action.payload.isLoggedIn
            state.current = action.payload.userData
            state.token = action.payload.token
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(actions.getNewProducts.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             state.newProducts = action.payload;
    //         })
    //         .addCase(actions.getNewProducts.pending, (state, actions) => {
    //             state.isLoading = true;
    //         })
    //         .addCase(actions.getNewProducts.rejected, (state, actions) => {
    //             state.isLoading = false;
    //             state.errorMessage = actions.payload.message
    //         });
    // }
});
export const { register } = userSlice.actions

export default userSlice.reducer;
