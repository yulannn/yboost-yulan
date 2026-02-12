import { IsInt, IsNotEmpty } from 'class-validator';


export class cocktailIngredientEntity {
  @IsInt()
  @IsNotEmpty()
  cocktail_id: number;

  @IsInt()
  @IsNotEmpty()
  order_id: number;
}