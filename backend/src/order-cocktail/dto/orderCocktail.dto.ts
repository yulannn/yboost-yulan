import { IsInt, IsNotEmpty } from 'class-validator';


export class orderCocktailDto {
  @IsInt()
  @IsNotEmpty()
  cocktail_id: number;

  @IsInt()
  @IsNotEmpty()
  order_id: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}