import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import $api from '../http';

export default class AuthService {
  static async login(email, password) {
    return $api.post('/login', { email, password });
  }

  static async register(formData) {
    return $api.post('/register', { formData });
  }

  static async logout() {
    return $api.post('/logout');
  }
}

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post(
      'http://127.0.0.1:5000/refresh',
      {
        token: refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};

export const isLoggedIn = async () => {
  let token = localStorage.getItem('accessToken');
  if (!token) {
    token = await refreshAccessToken();
    if (!token) return false;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 > new Date().getTime()) {
      return true;
    } else {
      token = await refreshAccessToken();
      return token ? true : false;
    }
  } catch (error) {
    token = await refreshAccessToken();
    return token ? true : false;
  }
};
