import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
  Box,
  Container,
} from '@mui/material';
import {
  ShoppingCart,
  Store,
  Home,
  Receipt,
  AutoAwesome,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount } = useCart();
  const menuItems = [
    { label: 'Início', path: '/', icon: <Home /> },
    { label: 'Produtos', path: '/products', icon: <Store /> },
    { label: 'Pedidos', path: '/orders', icon: <Receipt /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'linear-gradient(90deg, rgba(10,10,10,0.95), rgba(26,26,26,0.95))',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 245, 255, 0.2)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s ease-in-out',
                }
              }}
              onClick={() => navigate('/')}
            >
              <AutoAwesome 
                sx={{ 
                  mr: 1, 
                  color: '#00f5ff',
                  fontSize: 32,
                  filter: 'drop-shadow(0 0 10px rgba(0, 245, 255, 0.5))',
                }} 
              />              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontFamily: 'Orbitron',
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #00f5ff, #ff3d71)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
                }}
              >
                DEVNOLOGY
              </Typography>
            </Box>
          </motion.div>

          {/* Navigation Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Button
                  color="inherit"
                  startIcon={item.icon}
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 1,
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    background: isActive(item.path) 
                      ? 'linear-gradient(45deg, rgba(0, 245, 255, 0.2), rgba(255, 61, 113, 0.2))'
                      : 'transparent',
                    border: isActive(item.path) 
                      ? '1px solid rgba(0, 245, 255, 0.4)'
                      : '1px solid transparent',
                    '&:hover': {
                      background: 'linear-gradient(45deg, rgba(0, 245, 255, 0.1), rgba(255, 61, 113, 0.1))',
                      border: '1px solid rgba(0, 245, 255, 0.3)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 15px rgba(0, 245, 255, 0.2)',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </Box>

          {/* Cart Icon */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <IconButton
              color="inherit"
              onClick={() => navigate('/cart')}
              sx={{
                background: itemCount > 0 
                  ? 'linear-gradient(45deg, rgba(255, 61, 113, 0.2), rgba(0, 245, 255, 0.2))'
                  : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(0, 245, 255, 0.3)',
                borderRadius: 2,
                '&:hover': {
                  background: 'linear-gradient(45deg, rgba(255, 61, 113, 0.3), rgba(0, 245, 255, 0.3))',
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 15px rgba(0, 245, 255, 0.3)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <Badge 
                badgeContent={itemCount} 
                color="secondary"
                sx={{
                  '& .MuiBadge-badge': {
                    background: 'linear-gradient(45deg, #ff3d71, #ff6b8a)',
                    color: 'white',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 8px rgba(255, 61, 113, 0.3)',
                  }
                }}
              >
                <ShoppingCart 
                  sx={{ 
                    color: '#00f5ff',
                    filter: 'drop-shadow(0 0 5px rgba(0, 245, 255, 0.5))',
                  }} 
                />
              </Badge>
            </IconButton>
          </motion.div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
