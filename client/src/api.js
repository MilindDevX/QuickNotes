import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'YOUR_RENDER_BACKEND_URL/api'  // Replace with your Render URL
    : 'http://localhost:5001/api',
});

// Interceptor to add the auth token to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
