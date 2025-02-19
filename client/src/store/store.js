import { configureStore } from '@reduxjs/toolkit';
import CategorySlice from './category/categorySlice';
import productSlice from './products/productSlice';
import userSlice from './user/userSlice';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const commonConfig = {
  key: 'shop/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token'],
}
export const store = configureStore({
  reducer: {
    category: CategorySlice,
    product: productSlice,
    user: persistReducer(userConfig, userSlice)
  },
});
export const persistor = persistStore(store);
