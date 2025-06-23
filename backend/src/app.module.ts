import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProvidersModule } from './modules/providers/providers.module';

import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),    TypeOrmModule.forRoot({
      type: (process.env.NODE_ENV === 'production' ? 'postgres' : 'sqlite') as any,
      url: process.env.DATABASE_URL,
      database: process.env.NODE_ENV === 'production' ? undefined : 'ecommerce.db',
      entities: [Product, Order, OrderItem],
      synchronize: true, // Only for development
      logging: process.env.NODE_ENV !== 'production',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
      exclude: ['/api*'],
    }),
    HttpModule,
    ProductsModule,
    OrdersModule,
    ProvidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
