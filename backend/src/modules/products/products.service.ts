import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../entities/product.entity';

interface BrazilianProduct {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  imagem?: string;
  categoria?: string;
  material?: string;
  departamento?: string;
  name?: string; // Backup field
}

interface EuropeanProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  gallery?: string[];
  hasDiscount?: boolean;
  discountValue?: string;
  details?: {
    adjective?: string;
    material?: string;
  };
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly httpService: HttpService,
  ) {}  async syncProductsFromProviders(): Promise<void> {
    try {
      console.log('Starting product synchronization...');
      
      // Sync Brazilian products
      const brazilianResponse = await firstValueFrom(
        this.httpService.get('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider')
      );
      
      const brazilianProducts: BrazilianProduct[] = brazilianResponse.data;
      console.log(`Found ${brazilianProducts.length} Brazilian products`);
      
      for (const product of brazilianProducts) {
        const productData = {
          external_id: product.id,
          name: product.nome || product.name || 'Unknown Product',
          description: product.descricao || 'No description available',
          price: parseFloat(product.preco) || 0,
          image: product.imagem,
          category: product.categoria || product.departamento,
          provider: 'br' as const,
          available: true,
          stock: 100,
        };

        // Check if product already exists
        const existingProduct = await this.productRepository.findOne({
          where: {
            external_id: product.id,
            provider: 'br'
          }
        });

        if (existingProduct) {
          // Update existing product
          await this.productRepository.update(existingProduct.id, productData);
        } else {
          // Create new product
          await this.productRepository.save(productData);
        }
        
        console.log(`Synced Brazilian product: ${productData.name}`);
      }

      // Sync European products
      const europeanResponse = await firstValueFrom(
        this.httpService.get('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider')
      );
      
      const europeanProducts: EuropeanProduct[] = europeanResponse.data;
      console.log(`Found ${europeanProducts.length} European products`);
      
      for (const product of europeanProducts) {
        const productData = {
          external_id: product.id,
          name: product.name || 'Unknown Product',
          description: product.description || 'No description available',
          price: parseFloat(product.price) || 0,
          image: product.gallery?.[0],
          category: product.details?.adjective || 'General',
          provider: 'eu' as const,
          available: true,
          stock: 100,
        };

        // Check if product already exists
        const existingProduct = await this.productRepository.findOne({
          where: {
            external_id: product.id,
            provider: 'eu'
          }
        });

        if (existingProduct) {
          // Update existing product
          await this.productRepository.update(existingProduct.id, productData);
        } else {
          // Create new product
          await this.productRepository.save(productData);
        }
        
        console.log(`Synced European product: ${productData.name}`);
      }
      
      console.log('Product synchronization completed successfully');
    } catch (error) {
      console.error('Error syncing products:', error);
      throw error;
    }
  }

  async findAll(filters?: {
    search?: string;
    category?: string;
    provider?: string;
    minPrice?: number;
    maxPrice?: number;
    available?: boolean;
  }): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (filters?.search) {
      queryBuilder.where(
        '(product.name LIKE :search OR product.description LIKE :search)',
        { search: `%${filters.search}%` }
      );
    }

    if (filters?.category) {
      queryBuilder.andWhere('product.category = :category', { category: filters.category });
    }

    if (filters?.provider) {
      queryBuilder.andWhere('product.provider = :provider', { provider: filters.provider });
    }

    if (filters?.minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice: filters.minPrice });
    }

    if (filters?.maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice: filters.maxPrice });
    }

    if (filters?.available !== undefined) {
      queryBuilder.andWhere('product.available = :available', { available: filters.available });
    }

    queryBuilder.orderBy('product.created_at', 'DESC');

    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async getCategories(): Promise<string[]> {
    const result = await this.productRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .where('product.category IS NOT NULL')
      .getRawMany();
    
    return result.map(r => r.category).filter(Boolean);
  }

  async getProviders(): Promise<{ provider: string; count: number }[]> {
    const result = await this.productRepository
      .createQueryBuilder('product')
      .select('product.provider', 'provider')
      .addSelect('COUNT(*)', 'count')
      .groupBy('product.provider')
      .getRawMany();
    
    return result;
  }
}
