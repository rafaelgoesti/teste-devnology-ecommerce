import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  TextField,
  Divider,
  Paper,
  Chip,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCartCheckout,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, removeItem, updateQuantity } = useCart();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', py: 8 }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <ShoppingCartOutlined sx={{ fontSize: 120, color: '#00f5ff', mb: 3 }} />
              <Typography
                variant="h3"
                sx={{
                  mb: 3,
                  fontFamily: 'Orbitron',
                  background: 'linear-gradient(45deg, #00f5ff, #ff3d71)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Seu Carrinho está Vazio
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: '#b0b0b0' }}>
                Discover amazing products and add them to your cart
              </Typography>
              <Button
                size="large"
                onClick={() => navigate('/products')}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #00f5ff, #0080ff)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ff3d71, #ff6b8a)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                Começar a Comprar
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 4,
              fontFamily: 'Orbitron',
              background: 'linear-gradient(45deg, #00f5ff, #ff3d71)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Carrinho de Compras
          </Typography>
        </motion.div>

        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
          {/* Itens do Carrinho */}
          <Box sx={{ flex: 1 }}>
            {items.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    mb: 2,
                    background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
                    border: '1px solid rgba(0, 245, 255, 0.2)',
                    '&:hover': {
                      border: '1px solid rgba(0, 245, 255, 0.4)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                      {/* Product Image */}
                      <Box
                        component="img"
                        src={item.product.image || '/api/placeholder/120/120'}
                        alt={item.product.name}
                        sx={{
                          width: 120,
                          height: 120,
                          objectFit: 'cover',
                          borderRadius: 2,
                          background: 'linear-gradient(45deg, #1a1a1a, #2d2d2d)',
                        }}
                      />

                      {/* Product Info */}
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{ color: '#ffffff', fontWeight: 600 }}
                          >
                            {item.product.name}
                          </Typography>
                          <Chip
                            label={item.product.provider === 'br' ? 'Brazilian' : 'European'}
                            size="small"
                            sx={{
                              background: item.product.provider === 'br' 
                                ? 'linear-gradient(45deg, #00ff00, #32cd32)'
                                : 'linear-gradient(45deg, #4169e1, #6495ed)',
                              color: 'white',
                            }}
                          />
                        </Box>
                        
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#b0b0b0',
                            mb: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {item.product.description}
                        </Typography>

                        <Typography
                          variant="h6"
                          sx={{
                            color: '#00f5ff',
                            fontFamily: 'Orbitron',
                            fontWeight: 700,
                          }}
                        >
                          ${item.product.price.toFixed(2)} each
                        </Typography>
                      </Box>

                      {/* Quantity Controls */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            sx={{
                              background: 'rgba(255, 61, 113, 0.2)',
                              color: '#ff3d71',
                              '&:hover': {
                                background: 'rgba(255, 61, 113, 0.4)',
                              },
                            }}
                          >
                            <Remove />
                          </IconButton>
                          
                          <TextField
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              handleQuantityChange(item.product.id, value);
                            }}
                            type="number"
                            size="small"
                            sx={{ width: 80 }}
                            inputProps={{ min: 1, max: item.product.stock }}
                          />
                          
                          <IconButton
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            sx={{
                              background: 'rgba(0, 245, 255, 0.2)',
                              color: '#00f5ff',
                              '&:hover': {
                                background: 'rgba(0, 245, 255, 0.4)',
                              },
                              '&:disabled': {
                                background: 'rgba(128, 128, 128, 0.2)',
                                color: '#808080',
                              },
                            }}
                          >
                            <Add />
                          </IconButton>
                        </Box>

                        <IconButton
                          onClick={() => removeItem(item.product.id)}
                          sx={{
                            background: 'rgba(255, 61, 113, 0.2)',
                            color: '#ff3d71',
                            '&:hover': {
                              background: 'rgba(255, 61, 113, 0.4)',
                            },
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>

                      {/* Subtotal */}
                      <Box sx={{ textAlign: 'right', minWidth: 120 }}>
                        <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 1 }}>
                          Subtotal
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#00f5ff',
                            fontFamily: 'Orbitron',
                            fontWeight: 700,
                          }}
                        >
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>

          {/* Resumo do Pedido */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Paper
              sx={{
                width: { xs: '100%', lg: 400 },
                p: 3,
                background: 'linear-gradient(145deg, rgba(26,26,26,0.8), rgba(45,45,45,0.8))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 245, 255, 0.2)',
                position: 'sticky',
                top: 20,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  color: '#00f5ff',
                  fontFamily: 'Orbitron',
                  textAlign: 'center',
                }}
              >
                Resumo do Pedido
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ color: '#b0b0b0' }}>
                    Itens ({items.length})
                  </Typography>
                  <Typography sx={{ color: '#ffffff' }}>
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ color: '#b0b0b0' }}>
                    Shipping
                  </Typography>
                  <Typography sx={{ color: '#00ff00' }}>
                    Free
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2, borderColor: 'rgba(0, 245, 255, 0.2)' }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: '#ffffff', fontWeight: 700 }}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#00f5ff',
                      fontFamily: 'Orbitron',
                      fontWeight: 700,
                    }}
                  >
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Button
                fullWidth
                size="large"
                startIcon={<ShoppingCartCheckout />}
                onClick={() => navigate('/checkout')}
                sx={{
                  py: 2,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #00f5ff, #0080ff)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ff3d71, #ff6b8a)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Prosseguir para Checkout
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/products')}
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderColor: '#00f5ff',
                  color: '#00f5ff',
                  '&:hover': {
                    borderColor: '#ff3d71',
                    color: '#ff3d71',
                    background: 'rgba(255, 61, 113, 0.1)',
                  },
                }}
              >
                Continue Shopping
              </Button>
            </Paper>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default CartPage;
