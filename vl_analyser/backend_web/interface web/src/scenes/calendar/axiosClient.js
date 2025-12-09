// src/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your actual API base URL
});

// Request interceptor
axiosClient.interceptors.request.use((config) => {
  console.log(`Request: ${config.method?.toUpperCase()} ${config.url}`);
  console.log('Request data:', config.data || config.params);
  return config;
}, (error) => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Response interceptor
axiosClient.interceptors.response.use((response) => {
  console.log('Response from:', response.config.url);
  console.log('Response data:', response.data);
  return response;
}, (error) => {
  console.error('Response error:', error.response || error.message);
  return Promise.reject(error);
});

export default axiosClient;