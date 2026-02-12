import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './employee/employee.module';
import { CocktailModule } from './cocktail/cocktail.module';
import { RoleModule } from './role/role.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { TableModule } from './table/table.module';
import { CocktailIngredientModule } from './cocktail-ingredient/cocktail-ingredient.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { OrderCocktailModule } from './order-cocktail/order-cocktail.module';

@Module({
  imports: [PrismaModule, EmployeeModule, CocktailModule, RoleModule, IngredientModule, TableModule, OrderModule, CocktailIngredientModule, AuthModule, OrderCocktailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
