import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/ProducSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
