import { IsInt, IsNotEmpty } from 'class-validator';

export class tableEntity {
  @IsInt()
  @IsNotEmpty()
  table_no: number;
}
