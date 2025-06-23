import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
} from '@mui/material';
import {
  Rocket,
  ShoppingBag,
  Star,
  TrendingUp,
  Security,
  Speed,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductsService } from '../services/products';
import { toast } from 'react-toastify';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const { data: stats } = useQuery({
    queryKey: ['product-stats'],
    queryFn: () => ProductsService.getProviders(),
  });

  useEffect(() => {
    // Sync products on first load
    const syncProducts = async () => {
      try {
        await ProductsService.syncProducts();        toast.success('🚀 Produtos sincronizados com sucesso!');
      } catch (error) {
        console.error('Failed to sync products:', error);
      }
    };

    syncProducts();
  }, []);
  const features = [
    {
      icon: <Speed sx={{ fontSize: 40, color: '#00f5ff' }} />,
      title: 'Super Rápido',
      description: 'Performance de próxima geração com entrega em velocidade quântica',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#ff3d71' }} />,
      title: 'Ultra Seguro',
      description: 'Criptografia de nível militar protege seus dados',
    },
    {
      icon: <Star sx={{ fontSize: 40, color: '#00f5ff' }} />,
      title: 'Qualidade Premium',
      description: 'Produtos selecionados dos melhores fornecedores globais',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }}>
      <Container maxWidth="xl" sx={{ py: 8 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" sx={{ mb: 8 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', md: '5rem' },
                fontFamily: 'Orbitron',
                fontWeight: 900,
                mb: 3,
                background: 'linear-gradient(45deg, #00f5ff, #ff3d71, #00f5ff)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient 3s ease infinite',
                '@keyframes gradient': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' },
                },
              }}            >
              DEVNOLOGY E-COMMERCE
            </Typography>            <Typography
              variant="h4"
              sx={{
                mb: 4,
                color: '#b0b0b0',
                fontWeight: 300,
                maxWidth: 800,
                mx: 'auto',
              }}
            >
              O Futuro do E-commerce está Aqui
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 6,
                color: '#808080',
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Experimente compras de próxima geração com nossa plataforma com IA, 
              apresentando produtos de fornecedores brasileiros e europeus
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                size="large"
                startIcon={<ShoppingBag />}
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
                }}              >
                Explorar Produtos
              </Button>
              <Button
                size="large"
                variant="outlined"
                startIcon={<Rocket />}
                onClick={() => navigate('/orders')}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  borderColor: '#00f5ff',
                  color: '#00f5ff',
                  '&:hover': {
                    borderColor: '#ff3d71',
                    color: '#ff3d71',
                    background: 'rgba(255, 61, 113, 0.1)',
                  },
                }}
              >
                Ver Pedidos
              </Button>
            </Box>
          </Box>
        </motion.div>

        {/* Stats Section */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Paper
              sx={{
                p: 4,
                mb: 8,
                background: 'linear-gradient(145deg, rgba(26,26,26,0.8), rgba(45,45,45,0.8))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 245, 255, 0.2)',
                borderRadius: 4,
              }}
            >              <Typography variant="h4" textAlign="center" sx={{ mb: 4, color: '#00f5ff' }}>
                Estatísticas do Marketplace Global
              </Typography><Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
                {stats.map((provider, index) => (
                  <Box key={provider.provider} sx={{ flex: 1, minWidth: 300 }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <Box textAlign="center">                        <Chip
                          label={provider.provider === 'br' ? 'Fornecedor Brasileiro' : 'Fornecedor Europeu'}
                          sx={{
                            mb: 2,
                            background: provider.provider === 'br' 
                              ? 'linear-gradient(45deg, #00ff00, #32cd32)'
                              : 'linear-gradient(45deg, #4169e1, #6495ed)',
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        />
                        <Typography variant="h2" sx={{ color: '#00f5ff', fontFamily: 'Orbitron' }}>
                          {provider.count}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#b0b0b0' }}>
                          Produtos Disponíveis
                        </Typography></Box>
                    </motion.div>
                  </Box>
                ))}
              </Box>
            </Paper>
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >          <Typography
            variant="h3"
            textAlign="center"
            sx={{ mb: 6, color: '#00f5ff', fontFamily: 'Orbitron' }}
          >
            Por que Escolher a DEVNOLOGY?
          </Typography><Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{ flex: 1, minWidth: 300, maxWidth: 400 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
                      border: '1px solid rgba(0, 245, 255, 0.2)',
                      '&:hover': {
                        border: '1px solid rgba(0, 245, 255, 0.6)',
                        boxShadow: '0 12px 40px rgba(0, 245, 255, 0.2)',
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                      <Box sx={{ mb: 3 }}>
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{ mb: 2, color: '#ffffff', fontWeight: 600 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: '#b0b0b0', lineHeight: 1.6 }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>                  </Card>
                </motion.div>
              </Box>
            ))}
          </Box>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Box
            sx={{
              mt: 10,
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(255, 61, 113, 0.1))',
              borderRadius: 4,
              border: '1px solid rgba(0, 245, 255, 0.3)',
            }}
          >
            <TrendingUp sx={{ fontSize: 60, color: '#00f5ff', mb: 2 }} />            <Typography variant="h4" sx={{ mb: 3, color: '#ffffff' }}>
              Pronto para Experimentar o Futuro?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: '#b0b0b0' }}>
              Junte-se a milhares de clientes satisfeitos na próxima geração de compras online
            </Typography>
            <Button
              size="large"
              onClick={() => navigate('/products')}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                background: 'linear-gradient(45deg, #ff3d71, #ff6b8a)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00f5ff, #0080ff)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Começar a Comprar Agora
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomePage;
