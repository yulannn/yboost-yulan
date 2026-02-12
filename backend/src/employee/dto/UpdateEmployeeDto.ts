import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './CreateEmployeeDto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  IsInt,
} from 'class-validator';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @ApiProperty({
    description: 'The first name of the employee.',
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @ApiProperty({
    description: 'The last name of the employee.',
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  lastname?: string;

  @ApiProperty({
    description: 'The email address of the employee.',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The password for the employee account.',
    maxLength: 255,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  password?: string;

  @ApiProperty({
    description: 'The country of the employee (optional).',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  country?: string;

  @ApiProperty({
    description: 'Profile picture URL of the employee (optional).',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  profilePic?: string;

  @ApiProperty({
    description: 'Role ID of the employee.',
    required: false,
  })
  @IsInt()
  @IsOptional()
  role_id?: number;
}
