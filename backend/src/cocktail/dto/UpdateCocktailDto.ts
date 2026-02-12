import { PartialType } from '@nestjs/mapped-types';
import { CreateCocktailDto } from './CreateCocktailDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber, IsUrl } from 'class-validator';

export class UpdateCocktailDto extends PartialType(CreateCocktailDto) {
  @ApiProperty({
    description: 'Name of the cocktail',
    example: 'Mojito',
    maxLength: 100,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @ApiProperty({
    description: 'Price of the cocktail',
    example: 9.99,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'URL of the cocktail image',
    example: 'https://example.com/images/mojito.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Description of the cocktail (optional)',
    example: 'A refreshing mint cocktail with rum and lime.',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @ApiProperty({
    description: 'Whether the cocktail contains alcohol or not',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  alcohol?: boolean;
}
