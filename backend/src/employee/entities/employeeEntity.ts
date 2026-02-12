import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsInt,
} from 'class-validator';

export class employeeEntity {
  // peux etre enlever le employee id de l'entity ? 
  employee_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  country: string | null;

  @IsUrl()
  profile_pic: string | null;

  @IsInt()
  role_id: number;

}