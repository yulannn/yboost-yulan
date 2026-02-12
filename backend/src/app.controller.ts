import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async healthCheck() {
    return { status: 'OK', timestamp: new Date().toISOString() };
  }

  @Get('db-test')
  async testDb() {
    try {
      // On teste la connexion en comptant les employés
      const count = await this.prisma.employee.count();
      return {
        status: 'Connected',
        database: 'PostgreSQL',
        employeeCount: count,
        message: 'La liaison avec la base de données est opérationnelle.'
      };
    } catch (error) {
      return {
        status: 'Error',
        database: 'Disconnected',
        message: 'Impossible de se connecter à la base de données.',
        details: error.message
      };
    }
  }
}
