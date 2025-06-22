import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
@Unique(['external_id', 'provider'])
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty()
  @Column({ nullable: true })
  image: string;

  @ApiProperty()
  @Column({ default: 'br' }) // 'br' for Brazilian, 'eu' for European
  provider: string;

  @ApiProperty()
  @Column({ nullable: true })
  external_id: string;

  @ApiProperty()
  @Column({ nullable: true })
  category: string;

  @ApiProperty()
  @Column({ default: true })
  available: boolean;

  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  stock: number;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
