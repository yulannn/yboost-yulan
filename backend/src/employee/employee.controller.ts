import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Logger,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/CreateEmployeeDto';
import { UpdateEmployeeDto } from './dto/UpdateEmployeeDto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UploadService } from 'src/upload/upload.service';
import { PrismaService } from '../prisma/prisma.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@UseGuards(AuthGuard)
@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {

  private readonly logger = new Logger(EmployeeController.name);
  
  constructor(
    private readonly uploadService: UploadService,
    private readonly employeeservice: EmployeeService,
    private readonly prisma: PrismaService,) { }

  // Controller pour Get tous les employés
  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({ status: 200, description: 'List of all employees' })
  async getAllEmployee() {
    return await this.employeeservice.getAllEmployee();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee found' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async getEmployeeById(@Param('id', ParseIntPipe) id: number) {
    return await this.employeeservice.getEmployeeById(id);
  }

  // Controller pour delete un employé via l'id donné en paramètre
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee deleted successfully' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    return await this.employeeservice.deleteEmployee(id);
  }

  // Controller pour update un employé via l'id donnée en paramètre
  @Patch(':id')
  @ApiOperation({ summary: 'Update an employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee updated successfully' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateEmployeeDto,
  ) {
    return await this.employeeservice.updateEmployee(id, data);
  }

  @Post(':id/avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar', { 
    storage: diskStorage({
      destination: './uploads/avatars',
      filename: (req, file, cb) => {
        const filename = `avatar-${req.params.id}-${Date.now()}.webp`;
        cb(null, filename);
      }
    })
  }))
  async uploadAvatar(
    @Param('id') userId: string,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // Max 2MB
        new FileTypeValidator({ fileType: 'image/(jpg|jpeg|png|webp)' }),
      ],
    })) file: Express.Multer.File,
  ) {
    try {
      this.logger.debug(`Processing avatar upload for user: ${userId}`);

      // Sauvegarde et compression de l'image
      const avatarPath = await this.uploadService.saveAvatar(file, userId);
      
      this.logger.debug(`Avatar saved at: ${avatarPath}`);
      
      // Mise à jour de l'utilisateur dans la base de données
      const updatedUser = await this.prisma.employee.update({
        where: { employee_id: parseInt(userId) },
        data: { profile_pic: avatarPath },
        select: {
          employee_id: true,
          name: true,
          lastname: true,
          email: true,
          profile_pic: true,
          country: true,
          role_id: true,
        },
      });

      return updatedUser;
    } catch (error) {
      this.logger.error('Error in uploadAvatar:', error);
      throw new Error(`Failed to upload avatar: ${error.message}`);
    }
  }
}
