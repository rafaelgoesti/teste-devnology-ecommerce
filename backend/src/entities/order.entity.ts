import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  customer_name: string;

  @ApiProperty()
  @Column()
  customer_email: string;

  @ApiProperty()
  @Column()
  customer_phone: string;

  @ApiProperty()
  @Column({ type: 'text' })
  customer_address: string;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount: number;

  @ApiProperty()
  @Column({ default: 'pending' }) // pending, confirmed, shipped, delivered, cancelled
  status: string;

  @ApiProperty()
  @Column({ nullable: true })
  payment_method: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  notes: string;
  @ApiProperty()
  @OneToMany('OrderItem', 'order', { cascade: true })
  items: any[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
