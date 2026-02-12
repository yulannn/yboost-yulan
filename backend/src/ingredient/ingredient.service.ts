import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateIngredientDto } from './dto/updateIngredientDto';
import { CreateIngredientDto } from './dto/createIngredientDto';
import { Ingredient } from '@prisma/client';
import { ingredientEntity } from './entities/ingredientEntity';

@Injectable()
export class IngredientService {
  constructor(private readonly prisma: PrismaService) { }

  async getAllIngredient(): Promise<ingredientEntity[] | null> {
    const ingredients = await this.prisma.ingredient.findMany();

    if (ingredients.length === 0) {
      throw new NotFoundException('No ingredient found');
    }

    return ingredients;
  }

  async getIngredientById(id: number): Promise<ingredientEntity | null> {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: {
        ingredient_id: id,
      },
    });

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }

    return ingredient;
  }


  async deleteIngredient(ingredientId: number): Promise<{ message: string; deletedIngredient: ingredientEntity }> {
    try {
      const deletedIngredient = await this.prisma.ingredient.delete({
        where: { ingredient_id: ingredientId }
      })
      return {
        message: `Ingredient with ID ${ingredientId} deleted successfully`,
        deletedIngredient
      };
    } catch (error) {
      throw new NotFoundException(
        `Ingredient ID ${ingredientId} not found`,
      );
    }
  }


  async createIngredient(data: CreateIngredientDto): Promise<ingredientEntity> {
    return await this.prisma.ingredient.create({
      data: { ...data },
    });
  }

  async updateIngredient(ingredientId: number, data: UpdateIngredientDto): Promise<ingredientEntity> {
    try {
      return await this.prisma.ingredient.update({
        where: { ingredient_id: ingredientId },
        data: { ...data },
      });
    } catch {
      throw new NotFoundException(
        `Ingredient with ID ${ingredientId} not found`,
      );
    }
  }
}
