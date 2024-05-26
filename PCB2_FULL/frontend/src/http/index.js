import axios from 'axios';

export const API_URL = 'http://127.0.0.1:5000/';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('token', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН', e);
      }
    }
    throw error;
  }
);

// $api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       try {
//         const originalRequest = error.config;
//         const response = await axios.get(`${API_URL}/refresh`, {
//           withCredentials: true,
//         });
//         localStorage.setItem('accessToken', response.data.accessToken);
//         originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
//         return $api(originalRequest);
//       } catch (e) {
//         console.log('Unable to refresh token', e);
//         throw e;
//       }
//     }
//     throw error;
//   }
// );

export default $api;
