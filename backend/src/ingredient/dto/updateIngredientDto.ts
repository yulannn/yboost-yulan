import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientDto } from './createIngredientDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {
  
  @ApiProperty({
    description: 'Name of the ingredient',
    example: 'Vodka',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'URL of the ingredient image',
    example: 'https://example.com/images/vodka.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Indicates if the ingredient contains alcohol',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  alcohol?: boolean;

  @ApiProperty({
    description: 'Stock quantity of the ingredient',
    example: 100,
    minimum: 0,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;
}
