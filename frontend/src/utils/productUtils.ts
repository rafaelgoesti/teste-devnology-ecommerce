import { Product } from '../types';

// Helper function to normalize product data from different API formats
export const normalizeProduct = (rawProduct: any): Product => {
  // Handle different API response formats
  const price = typeof rawProduct.price === 'string' 
    ? parseFloat(rawProduct.price) 
    : (typeof rawProduct.preco === 'string' ? parseFloat(rawProduct.preco) : rawProduct.price || 0);
    
  return {
    id: parseInt(rawProduct.id) || rawProduct.id,
    name: rawProduct.name || rawProduct.nome || 'Produto sem nome',
    description: rawProduct.description || rawProduct.descricao || 'Descrição não disponível',
    price: price,
    image: rawProduct.image || rawProduct.imagem || rawProduct.gallery?.[0] || '/api/placeholder/320/200',
    provider: rawProduct.provider || 'br',
    external_id: rawProduct.external_id || rawProduct.id?.toString() || '',
    category: rawProduct.category || rawProduct.categoria || 'Geral',
    available: rawProduct.available !== false, // Default to true unless explicitly false
    stock: rawProduct.stock || 10, // Default stock
    created_at: rawProduct.created_at || new Date().toISOString(),
    updated_at: rawProduct.updated_at || new Date().toISOString(),
  };
};

// Helper function to safely get product price as number
export const getProductPrice = (price: any): number => {
  return typeof price === 'number' ? price : parseFloat(price || 0);
};
