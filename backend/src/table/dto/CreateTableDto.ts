import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateTableDto {
  @IsInt()
   @ApiProperty({
      description: "N° of the table",
      type: 'number',
      example: 1,
  }) 
  table_no: number;
}
