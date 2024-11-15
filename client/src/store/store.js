import { configureStore } from '@reduxjs/toolkit';
import CategorySlice from './category/categorySlice';
import productSlice from './products/productSlice';

export const store = configureStore({
  reducer: {
    category: CategorySlice,
    product: productSlice,
  },
});
