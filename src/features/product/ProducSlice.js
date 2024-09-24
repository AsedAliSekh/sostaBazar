import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductsByFilters } from './ProductAPI';

const initialState = {
  products: [],
  status: 'idle',
};


export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async (amount) => {
    const response = await fetchAllProducts(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductByFilterAsync = createAsyncThunk(
  'product/fetchProductByFilterAsync',
  async (filter) => {
    const response = await fetchProductsByFilters(filter);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;


export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
