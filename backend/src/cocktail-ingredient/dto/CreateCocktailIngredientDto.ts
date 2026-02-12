import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCocktailIngredientDto {
  @ApiProperty({
    description: 'ID of the cocktail',
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  cocktail_id: number;

  @ApiProperty({
    description: 'ID of the ingredient',
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  ingredient_id: number;

  @ApiProperty({
    description: 'Quantity of ingredient needed for the cocktail',
    type: Number,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantity: number;
}
