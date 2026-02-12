import { Module } from '@nestjs/common';
import { OrderCocktailService } from './order-cocktail.service';
import { OrderCocktailController } from './order-cocktail.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [OrderCocktailService, PrismaService],
  controllers: [OrderCocktailController]
})
export class OrderCocktailModule { }
