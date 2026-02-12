import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from './RoleDto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRoleDto extends PartialType(RoleDto) {
    @ApiProperty({
        description: 'Optional property to update the role name.',
        required: false,  // Cette propriété est optionnelle
      })
      name?: string;
}



