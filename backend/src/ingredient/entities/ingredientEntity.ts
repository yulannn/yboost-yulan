import { IsBoolean, IsInt, IsString, Min } from 'class-validator';

export class ingredientEntity {
  @IsInt()
  ingredient_id: number;

  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsBoolean()
  alcohol: boolean;

  @IsInt()
  @Min(0)
  stock: number;
}