import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from './userSlice';
import axios from 'axios';
import { API_URL } from '../../http';

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post(`${API_URL}refresh`, null, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      localStorage.setItem('accessToken', response.data.access_token);
      dispatch(
        setUser({ accessToken: response.data.access_token, refreshToken })
      );
    } catch (error) {
      console.log(error.response?.data?.message);
      throw error;
    }
  }
);
