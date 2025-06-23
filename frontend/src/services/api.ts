import axios from 'axios';

// URL fixa para produção - sem dependência de variáveis de ambiente
const API_BASE_URL = 'https://teste-devnology-ecommerce-2cbfc0d098c4.herokuapp.com/api';

// Log para debug
console.log('🌐 API_BASE_URL configurada para:', API_BASE_URL);

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
