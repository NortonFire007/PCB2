import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';

const initialState = {
  // user: null,
  accessToken: null,
  isAuthenticated: false,
};

// Async thunk for login
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      const { id, accessToken, refreshToken } = response.data;
      thunkAPI.dispatch(setUser({ id, accessToken, refreshToken }));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for registration
export const register = createAsyncThunk(
  'user/register',
  async (formData, thunkAPI) => {
    try {
      const response = await AuthService.register(formData);
      const { user, accessToken } = response.data;
      thunkAPI.dispatch(setUser({ user, accessToken }));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for logout
// export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
//   try {
//     await AuthService.logout();
//     thunkAPI.dispatch(logoutUser());
//   } catch (error) {
//     console.error('Failed to logout:', error);
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    logoutUser: (state) => {
      // state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       localStorage.setItem('token', action.payload.token);
//     },
//     logoutUser: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem('token');
//     },
//   },
// });

// export const { setUser, logoutUser } = userSlice.actions;

// export default userSlice.reducer;
