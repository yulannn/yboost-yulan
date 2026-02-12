import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleController } from './role.controller';

@Module({
  providers: [RoleService, PrismaService],
  exports: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
