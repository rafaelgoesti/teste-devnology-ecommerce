const DEVELOPMENT_API_URL = 'http://localhost:3001/api';
// eslint-disable-next-line no-unused-vars
const PRODUCTION_API_URL = 'https://ecommerce-teste-backend-production.up.railway.app/api';

// Use environment variable if available, otherwise use production URL for deployment
const API_URL = process.env.REACT_APP_API_URL || PRODUCTION_API_URL;

// Export para usar em qualquer lugar
export { API_URL };

console.log('🚀 USANDO URL DA API:', API_URL);
