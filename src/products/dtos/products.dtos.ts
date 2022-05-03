import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive } from 'class-validator';
//import { PartialType } from '@nestjs/mapped-types';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre del producto' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Descripcion del producto' })
  readonly description: string;
  
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Precio del producto' })
  readonly price: number;
  
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Stock disponibles del producto' })
  readonly stock: number;
  
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'Imagen del producto' })
  readonly image: string;
}

  export class UpdateProductDto extends PartialType(CreateProductDto) {}