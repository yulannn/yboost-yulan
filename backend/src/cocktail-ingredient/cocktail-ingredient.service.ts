import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCocktailIngredientDto } from './dto/CreateCocktailIngredientDto';
import { cocktailIngredientEntity } from './entities/cocktailIngredientEntity';

@Injectable()
export class CocktailIngredientService {
  constructor(private readonly prisma: PrismaService) { }

  async updateMojitoIngredients() {
    try {
      // Trouver l'ID du Mojito
      const mojito = await this.prisma.cocktail.findFirst({
        where: { name: 'Mojito' }
      });

      if (!mojito) {
        throw new NotFoundException('Mojito not found');
      }

      // Mettre à jour les quantités d'ingrédients
      const ingredients = [
        { name: 'Menthe', quantity: 6 },
        { name: 'Citron vert', quantity: 1 },
        { name: 'Rhum blanc', quantity: 6 },
        { name: 'Sucre de canne', quantity: 2 },
        { name: 'Eau gazeuse', quantity: 10 }
      ];

      for (const ingredient of ingredients) {
        const ingredientRecord = await this.prisma.ingredient.findFirst({
          where: { name: ingredient.name }
        });

        if (ingredientRecord) {
          await this.prisma.cocktailIngredient.upsert({
            where: {
              cocktail_id_ingredient_id: {
                cocktail_id: mojito.cocktail_id,
                ingredient_id: ingredientRecord.ingredient_id
              }
            },
            update: {
              quantity: ingredient.quantity
            },
            create: {
              cocktail_id: mojito.cocktail_id,
              ingredient_id: ingredientRecord.ingredient_id,
              quantity: ingredient.quantity
            }
          });
        }
      }

      return { message: 'Mojito ingredients updated successfully' };
    } catch (error) {
      console.error('Error updating Mojito ingredients:', error);
      throw error;
    }
  }

  async deleteIngredient(cocktailId: number, ingredientId: number): Promise<{ message: string }> {
    try {
      const deletedIngredient = await this.prisma.cocktailIngredient.delete({
        where: {
          cocktail_id_ingredient_id: {
            cocktail_id: cocktailId,
            ingredient_id: ingredientId,
          },
        },
      });
      return { message: `Ingredient with ID ${cocktailId} has been deleted from ${deletedIngredient}` };
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`Ingredient with Cocktail ID ${cocktailId} and Ingredient ID ${ingredientId} not found`);
    }
  }

  async getIngredientForCocktail(cocktailId: number): Promise<cocktailIngredientEntity[]> {
    try {
      const ingredients = await this.prisma.cocktailIngredient.findMany({
        where: { cocktail_id: cocktailId },
        include: { ingredient: true },
      });

      if (ingredients.length === 0) {
        throw new NotFoundException(`No ingredients found for cocktail with ID ${cocktailId}`);
      }

      return ingredients;
    } catch (error) {
      console.error(error);
      throw error instanceof NotFoundException
        ? error
        : new Error(`An error occurred while fetching ingredients for cocktail ID ${cocktailId}`);
    }
  }

  async getCocktailForIngredient(ingredientId: number): Promise<cocktailIngredientEntity[]> {
    try {
      const cocktails = await this.prisma.cocktailIngredient.findMany({
        where: { ingredient_id: ingredientId },
        include: { cocktail: true },
      });

      if (cocktails.length === 0) {
        throw new NotFoundException(`No cocktails found for ingredient with ID ${ingredientId}`);
      }

      return cocktails;
    } catch (error) {
      console.error(error);
      throw error instanceof NotFoundException
        ? error
        : new Error(`An error occurred while fetching cocktails for ingredient ID ${ingredientId}`);
    }
  }
}
