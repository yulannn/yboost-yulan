import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RoleDto {
   
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    description: "Name of a role",
    type: 'string',
    example: 'Serveur',
}) 
  name: string;
}
