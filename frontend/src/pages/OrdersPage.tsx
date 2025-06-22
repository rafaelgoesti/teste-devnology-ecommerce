import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  alpha,
  Stack
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Receipt as ReceiptIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { getOrders } from '../services/orders';
import { Order } from '../types';
import { toast } from 'react-toastify';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getOrders();
        setOrders(response.data);
      } catch (err) {
        setError('Erro ao carregar pedidos');
        toast.error('Erro ao carregar pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <AccessTimeIcon />;
      case 'confirmed':
        return <ReceiptIcon />;
      case 'shipped':
        return <ShippingIcon />;
      case 'delivered':
        return <CheckCircleIcon />;
      default:
        return <ShoppingBagIcon />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Pendente';
      case 'confirmed':
        return 'Confirmado';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Meus Pedidos
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Acompanhe o status dos seus pedidos
          </Typography>
        </Box>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card
              sx={{
                textAlign: 'center',
                py: 8,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
              }}
            >
              <CardContent>
                <ShoppingBagIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Nenhum pedido encontrado
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Você ainda não fez nenhum pedido. Explore nossos produtos e faça sua primeira compra!
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <Stack spacing={3}>
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Accordion
                  sx={{
                    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.9)})`,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    borderRadius: 2,
                    '&:before': { display: 'none' },
                    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ px: 3, py: 2 }}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight="bold">
                            Pedido #{order.id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(order.created_at)}
                          </Typography>
                        </Box>
                        <Box>
                          <Chip
                            icon={getStatusIcon(order.status)}
                            label={getStatusText(order.status)}
                            color={getStatusColor(order.status) as any}
                            variant="outlined"
                            sx={{ fontWeight: 'medium' }}
                          />
                        </Box>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" color="primary">
                            {formatCurrency(order.total_amount)}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, pb: 3 }}>
                    <Divider sx={{ mb: 3 }} />
                    
                    {/* Informações do Cliente */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Informações de Entrega
                      </Typography>
                      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Nome
                          </Typography>
                          <Typography variant="body1">
                            {order.customer_name}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Email
                          </Typography>
                          <Typography variant="body1">
                            {order.customer_email}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Telefone
                          </Typography>
                          <Typography variant="body1">
                            {order.customer_phone}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Endereço
                          </Typography>
                          <Typography variant="body1">
                            {order.customer_address}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Itens do Pedido */}
                    <Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Itens do Pedido
                      </Typography>
                      <TableContainer
                        component={Paper}
                        sx={{
                          background: alpha(theme.palette.background.paper, 0.5),
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Produto</TableCell>
                              <TableCell align="center">Quantidade</TableCell>
                              <TableCell align="right">Preço Unit.</TableCell>
                              <TableCell align="right">Subtotal</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.items.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <Box>
                                    <Typography variant="body1" fontWeight="medium">
                                      {item.product_name}
                                    </Typography>
                                    {item.product_image && (
                                      <Typography variant="body2" color="text.secondary">
                                        SKU: {item.product_id}
                                      </Typography>
                                    )}
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Chip
                                    label={item.quantity}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                  />
                                </TableCell>
                                <TableCell align="right">
                                  {formatCurrency(item.unit_price)}
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                  {formatCurrency(item.total_price)}
                                </TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell colSpan={3} align="right">
                                <Typography variant="h6" fontWeight="bold">
                                  Total:
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography variant="h6" fontWeight="bold" color="primary">
                                  {formatCurrency(order.total_amount)}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </Stack>
        )}
      </motion.div>
    </Container>
  );
};

export default OrdersPage;
