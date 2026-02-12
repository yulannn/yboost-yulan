import { IsNotEmpty, IsString } from 'class-validator';

export class roleEntity {
  role_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
