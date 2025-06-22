import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProvidersService } from './providers.service';

@ApiTags('providers')
@Controller('api/providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all products from both providers' })
  @ApiResponse({ status: 200, description: 'All products retrieved successfully' })
  async getAllProducts(): Promise<{
    brazilian: any[];
    european: any[];
    total: number;
  }> {
    return this.providersService.getAllProducts();
  }

  @Get('brazilian')
  @ApiOperation({ summary: 'Get all Brazilian products' })
  @ApiResponse({ status: 200, description: 'Brazilian products retrieved successfully' })
  async getBrazilianProducts(): Promise<any[]> {
    return this.providersService.getBrazilianProducts();
  }

  @Get('european')
  @ApiOperation({ summary: 'Get all European products' })
  @ApiResponse({ status: 200, description: 'European products retrieved successfully' })
  async getEuropeanProducts(): Promise<any[]> {
    return this.providersService.getEuropeanProducts();
  }

  @Get('brazilian/:id')
  @ApiOperation({ summary: 'Get Brazilian product by ID' })
  @ApiResponse({ status: 200, description: 'Brazilian product retrieved successfully' })
  async getBrazilianProductById(@Param('id') id: string): Promise<any> {
    return this.providersService.getBrazilianProductById(id);
  }

  @Get('european/:id')
  @ApiOperation({ summary: 'Get European product by ID' })
  @ApiResponse({ status: 200, description: 'European product retrieved successfully' })
  async getEuropeanProductById(@Param('id') id: string): Promise<any> {
    return this.providersService.getEuropeanProductById(id);
  }
}
