import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7051/api'
});

// This runs before EVERY request made with `api`.
// It grabs the token saved after login and attaches it automatically,
// so you never have to manually add it in every component.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is invalid or expired, the backend returns 401.
// This catches that globally and sends the user back to login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('portfolioId');
      window.location.href = '/Portfolio/login';
    }
    return Promise.reject(error);
  }
);

export default api;