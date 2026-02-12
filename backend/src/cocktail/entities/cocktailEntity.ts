import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber, IsUrl } from 'class-validator';


export class cocktailEntity {
  @IsNumber()
  @IsNotEmpty()
  cocktail_id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsNotEmpty()
  alcohol: boolean;
}