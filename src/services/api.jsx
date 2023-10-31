
import axios from 'axios';
import baseURL from './baseUrl';

const api = axios.create({
  baseURL: baseURL
});


api.interceptors.request.use(
  (config) => {
  
    const token = JSON.parse( localStorage.getItem('user')); 

    
    if (token) {
      config.headers.Authorization = `Bearer ${token.access}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
