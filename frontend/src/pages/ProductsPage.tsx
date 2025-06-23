import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  FilterList,
  Public,
  LocationOn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ProductsService } from '../services/products';
import { useCart } from '../context/CartContext';
import { Product, ProductFilters } from '../types';

const ProductsPage: React.FC = () => {
  const { addItem } = useCart();
  const [filters, setFilters] = useState<ProductFilters>({});
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => {
      console.log('🔍 Fazendo requisição para produtos com filtros:', filters);
      return ProductsService.getProducts(filters);
    },
    retry: 3,
    retryDelay: 1000,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => ProductsService.getCategories(),
  });

  const handleAddToCart = (product: Product) => {
    if (!product.available || product.stock <= 0) {
      toast.error('Produto não disponível');
      return;
    }
    addItem(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };
  if (error) {
    console.error('❌ Erro ao carregar produtos:', error);
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Falha ao carregar produtos. Verifique se o backend está funcionando.
        </Alert>
        <Alert severity="info">
          <Typography variant="body2">
            URL da API: {process.env.REACT_APP_API_URL || 'https://teste-devnology-ecommerce-2cbfc0d098c4.herokuapp.com/api'}
          </Typography>
          <Typography variant="body2">
            Erro: {error instanceof Error ? error.message : 'Erro desconhecido'}
          </Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', py: 4 }}>
      <Container maxWidth="xl">
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
            }}          >
            Explorar Produtos
          </Typography>
        </motion.div>

        {/* Filters */}
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
              <FilterList sx={{ color: '#00f5ff' }} />              <Typography variant="h6" sx={{ color: '#00f5ff' }}>
                Filtros
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>              <TextField
                label="Buscar Produtos"
                variant="outlined"
                size="small"
                value={filters.search || ''}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: '#00f5ff' }} />,
                }}
                sx={{ minWidth: 250 }}
              />

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={filters.category || ''}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  label="Categoria"
                >
                  <MenuItem value="">Todas Categorias</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Fornecedor</InputLabel>
                <Select
                  value={filters.provider || ''}
                  onChange={(e) => handleFilterChange('provider', e.target.value)}
                  label="Fornecedor"
                >
                  <MenuItem value="">Todos Fornecedores</MenuItem>
                  <MenuItem value="br">Brasileiro</MenuItem>
                  <MenuItem value="eu">Europeu</MenuItem>
                </Select>
              </FormControl>              <TextField
                label="Preço Mín"
                type="number"
                size="small"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', parseFloat(e.target.value))}
                sx={{ width: 120 }}
              />

              <TextField
                label="Preço Máx"
                type="number"
                size="small"
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', parseFloat(e.target.value))}
                sx={{ width: 120 }}
              />

              <Button
                variant="outlined"
                onClick={clearFilters}
                sx={{
                  borderColor: '#ff3d71',
                  color: '#ff3d71',
                  '&:hover': {
                    borderColor: '#ff6b8a',
                    background: 'rgba(255, 61, 113, 0.1)',
                  },
                }}
              >
                Limpar Filtros
              </Button>
            </Box>
          </Paper>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#00f5ff' }} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card
                  sx={{
                    width: 320,
                    height: 480,
                    background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
                    border: '1px solid rgba(0, 245, 255, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      border: '1px solid rgba(0, 245, 255, 0.6)',
                      boxShadow: '0 12px 40px rgba(0, 245, 255, 0.2)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image || '/api/placeholder/320/200'}
                    alt={product.name}
                    sx={{
                      objectFit: 'cover',
                      background: 'linear-gradient(45deg, #1a1a1a, #2d2d2d)',
                    }}
                  />
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        icon={product.provider === 'br' ? <LocationOn /> : <Public />}
                        label={product.provider === 'br' ? 'Brazilian' : 'European'}
                        size="small"
                        sx={{
                          background: product.provider === 'br' 
                            ? 'linear-gradient(45deg, #00ff00, #32cd32)'
                            : 'linear-gradient(45deg, #4169e1, #6495ed)',
                          color: 'white',
                        }}
                      />
                      <Chip
                        label={product.available && product.stock > 0 ? 'Available' : 'Out of Stock'}
                        size="small"
                        sx={{
                          background: product.available && product.stock > 0
                            ? 'linear-gradient(45deg, #00ff00, #32cd32)'
                            : 'linear-gradient(45deg, #ff4444, #ff6666)',
                          color: 'white',
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        color: '#ffffff',
                        fontWeight: 600,
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: '#b0b0b0',
                        mb: 2,
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {product.description}
                    </Typography>

                    {product.category && (
                      <Chip
                        label={product.category}
                        size="small"
                        sx={{
                          mb: 2,
                          background: 'rgba(0, 245, 255, 0.2)',
                          color: '#00f5ff',
                          alignSelf: 'flex-start',
                        }}
                      />
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: '#00f5ff',
                          fontWeight: 700,
                          fontFamily: 'Orbitron',
                        }}
                      >
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<ShoppingCart />}
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.available || product.stock <= 0}
                        sx={{
                          background: product.available && product.stock > 0
                            ? 'linear-gradient(45deg, #00f5ff, #0080ff)'
                            : 'rgba(128, 128, 128, 0.3)',
                          '&:hover': {
                            background: product.available && product.stock > 0
                              ? 'linear-gradient(45deg, #ff3d71, #ff6b8a)'
                              : 'rgba(128, 128, 128, 0.3)',
                          },
                        }}
                      >
                        Adicionar ao Carrinho
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        )}        {products.length === 0 && !isLoading && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#b0b0b0', mb: 2 }}>
              Nenhum produto encontrado
            </Typography>
            <Typography variant="body1" sx={{ color: '#808080' }}>
              Tente ajustar seus filtros ou termos de busca
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductsPage;
