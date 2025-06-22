import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { OrderItem } from '../../entities/order-item.entity';
import { Product } from '../../entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Calculate total amount
    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    for (const item of createOrderDto.items) {
      const product = await this.productRepository.findOne({ where: { id: item.product_id } });
      if (!product) {
        throw new Error(`Product with ID ${item.product_id} not found`);
      }

      if (!product.available || product.stock < item.quantity) {
        throw new Error(`Product ${product.name} is not available or insufficient stock`);
      }

      const itemTotal = item.unit_price * item.quantity;
      totalAmount += itemTotal;

      const orderItem = this.orderItemRepository.create({
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: itemTotal,
        product_name: item.product_name,
        product_image: item.product_image,
        product_id: item.product_id,
      });

      orderItems.push(orderItem);
    }

    // Create order
    const order = this.orderRepository.create({
      customer_name: createOrderDto.customer_name,
      customer_email: createOrderDto.customer_email,
      customer_phone: createOrderDto.customer_phone,
      customer_address: createOrderDto.customer_address,
      payment_method: createOrderDto.payment_method,
      notes: createOrderDto.notes,
      total_amount: totalAmount,
      status: 'pending',
    });

    const savedOrder = await this.orderRepository.save(order);

    // Save order items
    for (const orderItem of orderItems) {
      orderItem.order_id = savedOrder.id;
      await this.orderItemRepository.save(orderItem);
    }

    // Update product stock
    for (const item of createOrderDto.items) {
      await this.productRepository.decrement(
        { id: item.product_id },
        'stock',
        item.quantity
      );
    }

    return this.findOne(savedOrder.id);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['items'],
      order: { created_at: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items']
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }

  async updateStatus(id: number, status: string): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;
    await this.orderRepository.save(order);
    return order;
  }

  async getOrderStats(): Promise<{
    total_orders: number;
    total_revenue: number;
    pending_orders: number;
    completed_orders: number;
  }> {
    const [totalOrders, totalRevenue, pendingOrders, completedOrders] = await Promise.all([
      this.orderRepository.count(),
      this.orderRepository
        .createQueryBuilder('order')
        .select('SUM(order.total_amount)', 'total')
        .getRawOne(),
      this.orderRepository.count({ where: { status: 'pending' } }),
      this.orderRepository.count({ where: { status: 'delivered' } }),
    ]);

    return {
      total_orders: totalOrders,
      total_revenue: parseFloat(totalRevenue.total) || 0,
      pending_orders: pendingOrders,
      completed_orders: completedOrders,
    };
  }
}
