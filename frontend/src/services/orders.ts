import { api } from './api';
import { Order, CreateOrderData } from '../types';

export class OrdersService {
  static async createOrder(orderData: CreateOrderData): Promise<Order> {
    const response = await api.post('/orders', orderData);
    return response.data;
  }

  static async getOrders(): Promise<Order[]> {
    const response = await api.get('/orders');
    return response.data;
  }

  static async getOrder(id: number): Promise<Order> {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  }

  static async updateOrderStatus(id: number, status: string): Promise<Order> {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  }

  static async getOrderStats(): Promise<{
    total_orders: number;
    total_revenue: number;
    pending_orders: number;
    completed_orders: number;
  }> {
    const response = await api.get('/orders/stats');
    return response.data;
  }
}

export const createOrder = async (orderData: CreateOrderData) => {
  return api.post('/orders', orderData);
};

export const getOrders = async () => {
  return api.get<Order[]>('/orders');
};
