import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchCartItemsByUserId, deleteItemFromCart, updateCart, resetCart } from './cartAPI';

const initialState = {
  status: 'idle',
  items: []
};


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

// thunk for featch cart item firsttime 
export const fetchCartItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchCartItemsByUserId',
  async (userId) => {
    const response = await fetchCartItemsByUserId(userId);
    return response.data;
  }
);

// slice for update quentity of product in cart 
export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (updatedItem) => {
    const response = await updateCart(updatedItem);
    return response.data;
  }
);

// thunk for delete item from  cart 
export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
);

// thunk for reset cart after order placed
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
        alert("Product Succesfuly added")
      })
      .addCase(fetchCartItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items.splice(index, 1);
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items[index] = action.payload;
      }).addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = []
      });
  },
});

export const selectCartItems = (state)=>state.cart.items;

export default cartSlice.reducer;
