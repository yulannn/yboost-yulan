import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'State of the order (e.g., pending, completed)',
    example: 'completed',
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
} 