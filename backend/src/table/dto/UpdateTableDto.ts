import { PartialType } from '@nestjs/mapped-types';
import { CreateTableDto } from './CreateTableDto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTableDto extends PartialType(CreateTableDto) {
  @ApiProperty({
    description: 'Optional property to update the table number.',
    required: false, 
  })
  table_no?: number;
}
