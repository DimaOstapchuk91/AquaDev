import axios from 'axios';

  export const aquaDevApi = axios.create({
    baseURL: 'https://aquadev-back.onrender.com',
    // baseURL: 'http://localhost:3000',
    withCredentials: true,
  });
  
  export const setAuthHeader = token => {
    aquaDevApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  }




