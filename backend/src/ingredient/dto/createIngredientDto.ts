import { IsBoolean, IsInt, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIngredientDto {
  @ApiProperty({
    description: 'Name of the ingredient',
    example: 'Vodka',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'URL of the ingredient image',
    example: 'https://example.com/images/vodka.png',
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Indicates if the ingredient contains alcohol',
    example: true,
  })
  @IsBoolean()
  alcohol: boolean;

  @ApiProperty({
    description: 'Stock quantity of the ingredient',
    example: 100,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  stock: number;
}
