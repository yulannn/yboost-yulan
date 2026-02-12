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

export class authRegisterDto {
  @ApiProperty({
    description: 'The first name of the user.',
    example: 'John',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'The last name of the user.',
    example: 'Doe',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastname: string;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password for the user account.',
    example: 'StrongPassword123!',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  password: string;

  @ApiProperty({
    description: 'The country of the user (optional).',
    example: 'USA',
    required: false,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  country?: string;

  @ApiProperty({
    description: 'Profile picture URL of the user (optional).',
    example: 'https://example.com/profile-pic.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  profile_pic?: string;

  @ApiProperty({
    description: 'The role ID assigned to the user.',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  role_id: number;
}
