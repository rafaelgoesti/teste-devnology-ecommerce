import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity('order_items')
export class OrderItem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @ApiProperty()
  @Column()
  product_name: string;

  @ApiProperty()
  @Column({ nullable: true })
  product_image: string;

  @ApiProperty()
  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ApiProperty()
  @Column()
  order_id: number;

  @ApiProperty()
  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ApiProperty()
  @Column({ nullable: true })
  product_id: number;
}
