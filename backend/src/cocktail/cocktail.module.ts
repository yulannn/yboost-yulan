import { Module } from '@nestjs/common';
import { CocktailService } from './cocktail.service';
import { CocktailController } from './cocktail.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [CocktailService, PrismaService],
  controllers: [CocktailController]
})
export class CocktailModule { }
