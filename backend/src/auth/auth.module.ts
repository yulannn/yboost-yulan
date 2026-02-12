import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeeModule } from '../employee/employee.module';
import { RoleModule } from '../role/role.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    forwardRef(() => EmployeeModule),
    RoleModule,
    JwtModule.register({
      secret: 'tetedenoeil',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule { }
