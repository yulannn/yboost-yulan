import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Table number for the order',
    example: 5,
  })
  @IsInt()
  nb_table: number;

  @ApiProperty({
    description: 'State of the order (e.g., pending, completed)',
    example: 'pending',
  })
  @IsString()
  state: string;

  @ApiProperty({
    description: 'Employee ID responsible for the order (optional)',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  employee_id?: number;

  @ApiProperty({
    description: 'List of cocktails in the order with their quantities',
    example: [{ cocktail_id: 1, quantity: 2 }, { cocktail_id: 3, quantity: 1 }],
    type: [Object],
  })
  @IsArray()
  @ArrayNotEmpty()
  orderCocktails: { cocktail_id: number; quantity: number }[];
}
