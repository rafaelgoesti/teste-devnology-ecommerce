import { api } from './api';
import { Product, ProductFilters } from '../types';

export class ProductsService {
  static async getProducts(filters?: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.provider) params.append('provider', filters.provider);
    if (filters?.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.available !== undefined) params.append('available', filters.available.toString());

    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  }

  static async getProduct(id: number): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }

  static async getCategories(): Promise<string[]> {
    const response = await api.get('/products/categories');
    return response.data;
  }

  static async getProviders(): Promise<{ provider: string; count: number }[]> {
    const response = await api.get('/products/providers');
    return response.data;
  }

  static async syncProducts(): Promise<{ message: string }> {
    const response = await api.post('/products/sync');
    return response.data;
  }
}
