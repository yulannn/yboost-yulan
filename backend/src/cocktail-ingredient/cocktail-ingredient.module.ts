import { Module } from '@nestjs/common';
import { CocktailIngredientService } from './cocktail-ingredient.service';
import { CocktailIngredientController } from './cocktail-ingredient.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CocktailIngredientService, PrismaService],
  controllers: [CocktailIngredientController]
})
export class CocktailIngredientModule { }
