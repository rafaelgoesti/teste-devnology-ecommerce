import axios from 'axios';

// URL de produção HARD-CODED para garantir no build - SOLUÇÃO DEFINITIVA
const PRODUCTION_API_URL = 'https://ecommerce-backend-emergency-34f7b56be548.herokuapp.com/api';

// Garantir que sempre use a URL de produção
const API_BASE_URL = PRODUCTION_API_URL;

// Log para debug e verificação
console.log('🌐 API_BASE_URL DEFINITIVA:', API_BASE_URL);
console.log('🚀 URL HARD-CODED GARANTIDA:', PRODUCTION_API_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    console.log(`🌐 API Base URL: ${API_BASE_URL}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error:`, {
      method: error.config?.method?.toUpperCase(),
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      code: error.code
    });
    
    // Handle network errors specifically for mobile
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      console.error('🚨 Network connectivity issue detected');
    }
    
    return Promise.reject(error);
  }
);

export default api;
