import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import favoriteProductsReducer from './slices/favoriteProductSlice';
import errorReducer from './slices/errorSlice';
import userSlice from './slices/userSlice';
import categorySlice from './slices/categorySlice';
import recentlyViewedReducer from './slices/recentlyViewed';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favoriteProducts: favoriteProductsReducer,
    error: errorReducer,
    user: userSlice,
    category: categorySlice,
    recentlyViewed: recentlyViewedReducer,
  },
});

export default store;
