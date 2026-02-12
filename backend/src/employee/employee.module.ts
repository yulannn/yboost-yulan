import { Module, forwardRef } from '@nestjs/common';  // Ajouter l'import de forwardRef
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleService } from 'src/role/role.service';
import { AuthModule } from 'src/auth/auth.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [forwardRef(() => AuthModule), UploadModule],
  providers: [EmployeeService, PrismaService, RoleService],
  controllers: [EmployeeController],
})
export class EmployeeModule { }

