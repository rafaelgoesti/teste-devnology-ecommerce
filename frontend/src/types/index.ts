export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  provider: 'br' | 'eu';
  external_id: string;
  category?: string;
  available: boolean;
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_name: string;
  product_image?: string;
  product_id: number;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  total_amount: number;
  status: string;
  payment_method?: string;
  notes?: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface CreateOrderData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  payment_method?: string;
  notes?: string;
  items: {
    product_id: number;
    quantity: number;
    unit_price: number;
    product_name: string;
    product_image?: string;
  }[];
}

export interface ProductFilters {
  search?: string;
  category?: string;
  provider?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
}
