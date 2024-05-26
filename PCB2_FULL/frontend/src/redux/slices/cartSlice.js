import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from './errorSlice';
import $api from '../../http';

const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (item, thunkAPI) => {
    try {
      const response = await $api.post('/carts/items', item);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      throw error;
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (itemId, thunkAPI) => {
    try {
      const response = await $api.delete(`carts/items/${itemId}`);
      console.log(itemId);
      return itemId;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      throw error;
    }
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, thunkAPI) => {
    try {
      const response = await $api.get('carts/items');
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export const { setCartItems } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectIsLoading = (state) => state.cart.isLoading;
export const selectError = (state) => state.cart.error;

export default cartSlice.reducer;
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { setError } from './errorSlice';
// import $api from '../../http';
// import axios from 'axios';

// const initialState = {
//   cartItems: [],
//   isLoading: false,
//   error: null,
//   totalQuantity: 0,
// };

// export const addItemToCart = createAsyncThunk(
//   'cart/addItemToCart',
//   async (item, thunkAPI) => {
//     try {
//       const response = await $api.post('/carts/items', item);
//       return response.data;
//     } catch (error) {
//       thunkAPI.dispatch(setError(error.message));
//       throw error;
//     }
//   }
// );

// export const removeItemFromCart = createAsyncThunk(
//   'cart/removeItemFromCart',
//   async (itemId, thunkAPI) => {
//     try {
//       const response = await $api.delete(`carts/items/${itemId}`);
//       return itemId;
//     } catch (error) {
//       thunkAPI.dispatch(setError(error.message));
//       throw error;
//     }
//   }
// );

// export const fetchCart = createAsyncThunk(
//   'cart/fetchCart',
//   async (_, thunkAPI) => {
//     try {
//       const response = await $api.get('carts/items');
//       console.log('response from cart', response.data);
//       return response.data;
//     } catch (error) {
//       thunkAPI.dispatch(setError(error.message));
//       throw error;
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     setCartItems: (state, action) => {
//       state.cartItems = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.cartItems = action.payload;
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       })
//       .addCase(addItemToCart.fulfilled, (state, action) => {
//         state.cartItems.push(action.payload);
//       })
//       .addCase(removeItemFromCart.fulfilled, (state, action) => {
//         state.cartItems = state.cartItems.filter(
//           (item) => item.id !== action.payload
//         );
//       });
//   },
// });

// export const { setCartItems } = cartSlice.actions;

// export const selectCartItems = (state) => state.cartItems || [];
// export const selectIsLoading = (state) => state.cart.isLoading;
// export const selectError = (state) => state.cart.error;

// export default cartSlice.reducer;
