import { IsNotEmpty, IsEmail, IsString, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  unit_price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  product_image?: string;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  customer_email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customer_phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customer_address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  payment_method?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
