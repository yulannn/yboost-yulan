import { IsInt, IsNotEmpty, Min } from 'class-validator';


export class cocktailIngredientEntity {
  @IsInt()
  @IsNotEmpty()
  cocktail_id: number;

  @IsInt()
  @IsNotEmpty()
  ingredient_id: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantity: number;
}