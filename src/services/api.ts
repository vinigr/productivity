import axios from 'axios';
import AuthService from './auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_HOST_SERVER,
});

api.interceptors.request.use(async (config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
