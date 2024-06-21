import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  searchResults: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchResults, setLoading, setError } =
  searchSlice.actions;

export const searchProducts = (searchQuery) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // Simulate an API call to fetch products based on the search query
    const response = await fetch(
      `https://api.example.com/products?q=${searchQuery}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    dispatch(setSearchResults(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const selectSearchQuery = (state) => state.search.searchQuery;
export const selectSearchResults = (state) => state.search.searchResults;
export const selectLoading = (state) => state.search.loading;
export const selectError = (state) => state.search.error;

export default searchSlice.reducer;
