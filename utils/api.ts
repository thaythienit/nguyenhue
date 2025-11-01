
import axios from 'axios';

const api = axios.create({
  // For local development, this points to your backend server.
  // When deploying, you will need to change this to your live backend URL from Render.
  baseURL: 'https://nguyenhue-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    // Get user from localStorage
    const userString = localStorage.getItem('school-portal-user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
