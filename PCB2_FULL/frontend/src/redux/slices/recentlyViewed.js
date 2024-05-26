import { createSlice } from '@reduxjs/toolkit';

// Function to get product IDs from cookies
const getProductIdsFromCookies = () => {
  const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed'));
  return recentlyViewed ? recentlyViewed : [];
};

export const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState: getProductIdsFromCookies(),
  reducers: {
    addProduct: (state, action) => {
      const productId = action.payload;
      const index = state.indexOf(productId);
      if (index !== -1) {
        // If product ID exists, remove it from its current position
        state.splice(index, 1);
      }
      // Add product ID to the end of the array
      state.push(productId);
      // Limit the array length to 20
      state.splice(0, Math.max(0, state.length - 20));
      localStorage.setItem('recentlyViewed', JSON.stringify(state)); // Update cookies after adding product
    },
    getProductFromCookies: (state) => {
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed'));
      return recentlyViewed ? recentlyViewed : [];
    },
  },
});

export const { addProduct, getProductFromCookies } =
  recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
