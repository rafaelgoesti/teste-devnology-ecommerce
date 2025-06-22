import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Create futuristic theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f5ff', // Cyan
      light: '#5ddef4',
      dark: '#00b8cc',
    },
    secondary: {
      main: '#ff3d71', // Pink
      light: '#ff6b8a',
      dark: '#e91e63',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      background: 'linear-gradient(45deg, #00f5ff, #ff3d71)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontWeight: 600,
          background: 'linear-gradient(45deg, #00f5ff, #0080ff)',
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(0, 245, 255, .3)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            background: 'linear-gradient(45deg, #ff3d71, #ff6b8a)',
            boxShadow: '0 6px 10px 4px rgba(255, 61, 113, .3)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 15,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          '&:hover': {
            border: '1px solid rgba(0, 245, 255, 0.6)',
            boxShadow: '0 12px 40px rgba(0, 245, 255, 0.2)',
            transform: 'translateY(-4px)',
          },
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, rgba(10,10,10,0.95), rgba(26,26,26,0.95))',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 245, 255, 0.2)',
        },
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartProvider>
          <Router>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrdersPage />} />
              </Routes>
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                style={{
                  background: 'rgba(26, 26, 26, 0.9)',
                }}
              />
            </div>
          </Router>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
