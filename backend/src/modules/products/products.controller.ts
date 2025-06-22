import { Controller, Get, Param, Query, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from '../../entities/product.entity';

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('sync')
  @ApiOperation({ summary: 'Synchronize products from external providers' })
  @ApiResponse({ status: 201, description: 'Products synchronized successfully' })
  async syncProducts(): Promise<{ message: string }> {
    await this.productsService.syncProductsFromProviders();
    return { message: 'Products synchronized successfully' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with optional filters' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'provider', required: false })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'available', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully', type: [Product] })
  async findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('provider') provider?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('available') available?: string,
  ): Promise<Product[]> {
    const filters = {
      search,
      category,
      provider,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      available: available === 'true' ? true : available === 'false' ? false : undefined,
    };

    return this.productsService.findAll(filters);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all available categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  async getCategories(): Promise<string[]> {
    return this.productsService.getCategories();
  }

  @Get('providers')
  @ApiOperation({ summary: 'Get all providers with product counts' })
  @ApiResponse({ status: 200, description: 'Providers retrieved successfully' })
  async getProviders(): Promise<{ provider: string; count: number }[]> {
    return this.productsService.getProviders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }
}
