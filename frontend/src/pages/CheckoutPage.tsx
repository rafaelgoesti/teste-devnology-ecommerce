import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Payment,
  CheckCircle,
  Person,
  LocationOn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { OrdersService } from '../services/orders';
import { CreateOrderData } from '../types';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_address: '',
    payment_method: 'credit_card',
    notes: '',
  });

  const steps = ['Customer Info', 'Review Order', 'Payment'];

  const createOrderMutation = useMutation({
    mutationFn: (orderData: CreateOrderData) => OrdersService.createOrder(orderData),
    onSuccess: (order) => {
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/orders`);
    },
    onError: (error) => {
      console.error('Order creation failed:', error);
      toast.error('Falha ao criar pedido. Tente novamente.');
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate customer info
      if (!formData.customer_name || !formData.customer_email || !formData.customer_phone || !formData.customer_address) {
        toast.error('Please fill in all required fields');
        return;
      }
    }
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const orderData: CreateOrderData = {
      ...formData,
      items: items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        unit_price: item.product.price,
        product_name: item.product.name,
        product_image: item.product.image,
      })),
    };

    createOrderMutation.mutate(orderData);
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
            <Alert severity="warning" sx={{ mb: 4 }}>
              Seu carrinho está vazio. Adicione itens antes do checkout.
            </Alert>
            <Button onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
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
            Finalizar Compra
          </Typography>
        </motion.div>

        {/* Stepper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paper
            sx={{
              p: 3,
              mb: 4,
              background: 'linear-gradient(145deg, rgba(26,26,26,0.8), rgba(45,45,45,0.8))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 245, 255, 0.2)',
            }}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-label': {
                        color: index <= activeStep ? '#00f5ff' : '#808080',
                      },
                      '& .MuiStepIcon-root': {
                        color: index <= activeStep ? '#00f5ff' : '#808080',
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </motion.div>

        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            {/* Etapa 1: Informações do Cliente */}
            {activeStep === 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
                    border: '1px solid rgba(0, 245, 255, 0.2)',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Person sx={{ color: '#00f5ff', mr: 2 }} />
                      <Typography variant="h5" sx={{ color: '#00f5ff' }}>
                        Informações do Cliente
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <TextField
                        label="Nome Completo"
                        required
                        value={formData.customer_name}
                        onChange={(e) => handleInputChange('customer_name', e.target.value)}
                        fullWidth
                      />
                      
                      <TextField
                        label="Email"
                        type="email"
                        required
                        value={formData.customer_email}
                        onChange={(e) => handleInputChange('customer_email', e.target.value)}
                        fullWidth
                      />
                      
                      <TextField
                        label="Telefone"
                        required
                        value={formData.customer_phone}
                        onChange={(e) => handleInputChange('customer_phone', e.target.value)}
                        fullWidth
                      />
                      
                      <TextField
                        label="Endereço"
                        required
                        multiline
                        rows={3}
                        value={formData.customer_address}
                        onChange={(e) => handleInputChange('customer_address', e.target.value)}
                        fullWidth
                      />
                      
                      <TextField
                        label="Order Notes (Optional)"
                        multiline
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        fullWidth
                      />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Review Order */}
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
                    border: '1px solid rgba(0, 245, 255, 0.2)',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ color: '#00f5ff', mb: 3 }}>
                      Review Your Order
                    </Typography>

                    {items.map((item) => (
                      <Box
                        key={item.product.id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          py: 2,
                          borderBottom: '1px solid rgba(0, 245, 255, 0.1)',
                        }}
                      >
                        <Box>
                          <Typography sx={{ color: '#ffffff', fontWeight: 600 }}>
                            {item.product.name}
                          </Typography>
                          <Typography sx={{ color: '#b0b0b0' }}>
                            Quantity: {item.quantity}
                          </Typography>
                        </Box>
                        <Typography sx={{ color: '#00f5ff', fontFamily: 'Orbitron' }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
                    border: '1px solid rgba(0, 245, 255, 0.2)',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Payment sx={{ color: '#00f5ff', mr: 2 }} />
                      <Typography variant="h5" sx={{ color: '#00f5ff' }}>
                        Payment Method
                      </Typography>
                    </Box>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Payment Method</InputLabel>
                      <Select
                        value={formData.payment_method}
                        onChange={(e) => handleInputChange('payment_method', e.target.value)}
                        label="Payment Method"
                      >
                        <MenuItem value="credit_card">Credit Card</MenuItem>
                        <MenuItem value="debit_card">Debit Card</MenuItem>
                        <MenuItem value="pix">PIX</MenuItem>
                        <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                      </Select>
                    </FormControl>

                    <Alert severity="info" sx={{ mb: 3 }}>
                      This is a demo. No actual payment will be processed.
                    </Alert>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  borderColor: '#ff3d71',
                  color: '#ff3d71',
                  '&:hover': {
                    borderColor: '#ff6b8a',
                    background: 'rgba(255, 61, 113, 0.1)',
                  },
                }}
                variant="outlined"
              >
                Back
              </Button>

              <Button
                onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNext}
                disabled={createOrderMutation.isPending}
                startIcon={
                  createOrderMutation.isPending ? (
                    <CircularProgress size={20} />
                  ) : activeStep === steps.length - 1 ? (
                    <CheckCircle />
                  ) : null
                }
                sx={{
                  background: 'linear-gradient(45deg, #00f5ff, #0080ff)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ff3d71, #ff6b8a)',
                  },
                }}
              >
                {activeStep === steps.length - 1 ? 'Finalizar Pedido' : 'Próximo'}
              </Button>
            </Box>
          </Box>

          {/* Order Summary Sidebar */}
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
                Order Summary
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ color: '#b0b0b0' }}>
                    Items ({items.length})
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
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
            </Paper>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
