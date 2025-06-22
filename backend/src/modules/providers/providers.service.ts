import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProvidersService {
  constructor(private readonly httpService: HttpService) {}

  async getBrazilianProducts(): Promise<any[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider')
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Brazilian products:', error);
      throw error;
    }
  }

  async getEuropeanProducts(): Promise<any[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider')
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching European products:', error);
      throw error;
    }
  }

  async getBrazilianProductById(id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Brazilian product by ID:', error);
      throw error;
    }
  }

  async getEuropeanProductById(id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching European product by ID:', error);
      throw error;
    }
  }

  async getAllProducts(): Promise<{
    brazilian: any[];
    european: any[];
    total: number;
  }> {
    try {
      const [brazilian, european] = await Promise.all([
        this.getBrazilianProducts(),
        this.getEuropeanProducts()
      ]);

      return {
        brazilian,
        european,
        total: brazilian.length + european.length
      };
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  }
}
