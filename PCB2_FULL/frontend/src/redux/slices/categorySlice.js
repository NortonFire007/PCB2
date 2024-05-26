import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import $api from '../../http';
import { setError } from './errorSlice';

const initialState = {
  categories: [],
  categoryProducts: [],
};

export const fetchAsyncCategories = createAsyncThunk(
  'categories/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await $api.get('/categories');
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchAsyncProductsOfCategory = createAsyncThunk(
  'category-products/fetch',
  async (category, thunkAPI) => {
    try {
      const response = await $api.get(
        `products/search?category_id=${category}`
      );
      return response.data.products;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchAsyncProductsOfCategory.fulfilled, (state, action) => {
        state.categoryProducts = action.payload;
      });
  },
});

export const getAllCategories = (state) => state.category.categories;
export const getAllProductsByCategory = (state) =>
  state.category.categoryProducts;
export const getCategoryProductsStatus = (state) =>
  state.category.categoryProductsStatus;

export default categorySlice.reducer;
