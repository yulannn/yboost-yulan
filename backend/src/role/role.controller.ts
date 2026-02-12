import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiOperation } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { RoleDto } from './dto/RoleDto';
import { UpdateRoleDto } from './dto/UpdateRoleDto';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleservice: RoleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all roles', description: 'Fetches all roles in the database.' })
  @ApiResponse({ status: 200, description: 'Returns all roles.' })
  async getAllRole() {
    return await this.roleservice.getAllRole();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by ID', description: 'Fetches a single role by its ID.' })
  @ApiParam({ name: 'id', type: Number, description: 'Role ID' })
  @ApiResponse({ status: 200, description: 'Returns a role by ID.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  async getRoleById(@Param('id', ParseIntPipe) id: number) {
    return await this.roleservice.getRoleById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new role', description: 'Creates a new role with the provided data.' })
  @ApiResponse({ status: 201, description: 'Role successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  async createRole(@Body() data: RoleDto) {
    return await this.roleservice.createRole(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a role', description: 'Updates an existing role by its ID.' })
  @ApiParam({ name: 'id', type: Number, description: 'Role ID' })
  @ApiResponse({ status: 200, description: 'Role successfully updated.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRoleDto,
  ) {
    return await this.roleservice.updateRole(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role', description: 'Deletes a role by its ID.' })
  @ApiParam({ name: 'id', type: Number, description: 'Role ID' })
  @ApiResponse({ status: 200, description: 'Role successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  async deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    return await this.roleservice.deleteRole(id);
  }
}
