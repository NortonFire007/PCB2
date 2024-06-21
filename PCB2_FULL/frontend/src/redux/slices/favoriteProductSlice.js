import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from './errorSlice';
import $api from '../../http';

const initialState = {
  favoriteProducts: [],
  isLoading: false,
  error: null,
};

export const sendFavoriteProduct = createAsyncThunk(
  'favoriteProducts/sendFavoriteProducts',
  async (productId, thunkAPI) => {
    try {
      const response = await $api.post('/favourites', {
        product_id: productId,
      });
      return response.data;
    } catch (error) {
      // thunkAPI.dispatch(setError(error.message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchFavoriteProducts = createAsyncThunk(
  'favoriteProducts/fetchFavoriteProducts',
  async (_, thunkAPI) => {
    try {
      const response = await $api.get('/favourites');
      return response.data;
    } catch (error) {
      // thunkAPI.dispatch(setError(error.message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const favoriteProductsSlice = createSlice({
  name: 'favoriteProducts',
  initialState,
  reducers: {
    addFavoriteProduct: (state, action) => {
      state.favoriteProducts.push(action.payload);
    },
    removeFavoriteProduct: (state, action) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (productId) => productId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendFavoriteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendFavoriteProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendFavoriteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFavoriteProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteProducts = action.payload.map(
          (product) => product.product_id
        );
      })
      .addCase(fetchFavoriteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { addFavoriteProduct, removeFavoriteProduct } =
  favoriteProductsSlice.actions;

export const selectFavoriteProducts = (state) =>
  state.favoriteProducts.favoriteProducts;
export const selectIsLoading = (state) => state.favoriteProducts.isLoading;
export const selectError = (state) => state.favoriteProducts.error;

export default favoriteProductsSlice.reducer;
