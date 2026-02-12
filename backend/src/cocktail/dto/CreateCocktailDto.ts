import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCocktailDto {
  @ApiProperty({
    description: 'Name of the cocktail',
    example: 'Mojito',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Price of the cocktail',
    example: 9.99,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'URL of the cocktail image',
    example: 'https://example.com/images/mojito.jpg',
  })
  @IsUrl()
  @IsNotEmpty()
  image: string;

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
  })
  @IsBoolean()
  @IsNotEmpty()
  alcohol: boolean;
}
