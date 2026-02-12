import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CocktailIngredientService } from './cocktail-ingredient.service';
import { CreateCocktailIngredientDto } from './dto/CreateCocktailIngredientDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cocktail Ingredients')
@Controller('cocktail-ingredient')
export class CocktailIngredientController {
  constructor(private readonly cocktailIngredient: CocktailIngredientService) { }

  @Post('update-mojito')
  @ApiOperation({ summary: 'Update Mojito ingredients quantities' })
  @ApiResponse({
    status: 200,
    description: 'Mojito ingredients updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Mojito or ingredients not found.',
  })
  async updateMojitoIngredients() {
    return this.cocktailIngredient.updateMojitoIngredients();
  }

  @Delete(':cocktailId/:ingredientId')
  @ApiOperation({ summary: 'Remove an ingredient from a cocktail' })
  @ApiResponse({
    status: 200,
    description: 'Ingredient removed from the cocktail.',
  })
  @ApiResponse({
    status: 404,
    description: 'Ingredient or cocktail not found.',
  })
  async deleteIngredient(@Param('cocktailId', ParseIntPipe) cocktailId: number, @Param('ingredientId', ParseIntPipe) ingredientId: number,) {
    return this.cocktailIngredient.deleteIngredient(cocktailId, ingredientId);
  }

  @Get('cocktail/:cocktailId')
  @ApiOperation({ summary: 'Get ingredients for a specific cocktail' })
  @ApiResponse({
    status: 200,
    description: 'List of ingredients for the cocktail.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cocktail not found.',
  })
  async getIngredientForCocktail(@Param('cocktailId', ParseIntPipe) cocktailId: number) {
    return this.cocktailIngredient.getIngredientForCocktail(cocktailId);
  }

  @Get('ingredient/:ingredientId')
  @ApiOperation({ summary: 'Get cocktails for a specific ingredient' })
  @ApiResponse({
    status: 200,
    description: 'List of cocktails containing the ingredient.',
  })
  @ApiResponse({
    status: 404,
    description: 'Ingredient not found.',
  })
  async getCocktailForIngredient(@Param('ingredientId', ParseIntPipe) ingredientId: number) {
    return this.cocktailIngredient.getCocktailForIngredient(ingredientId);
  }
}
