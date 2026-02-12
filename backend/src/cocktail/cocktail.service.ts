import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCocktailDto } from './dto/CreateCocktailDto';
import { UpdateCocktailDto } from './dto/UpdateCocktailDto';
import { cocktailEntity } from './entities/cocktailEntity';

@Injectable()
export class CocktailService {
  constructor(private readonly prisma: PrismaService) { }

  async getAllCocktail(): Promise<cocktailEntity[] | null> {
    const cocktails = await this.prisma.cocktail.findMany();

    if (cocktails.length === 0) {
      throw new NotFoundException('No cocktails founds');
    }

    return cocktails;
  }

  async getAllCocktailsWithIngredients() {
    try {
      const cocktails = this.prisma.cocktail.findMany({
        include: {
          cocktailIngredients: {
            include: {
              ingredient: true,
            },
          },
        },
      });

      return cocktails
    }

    catch (error) {
      throw new NotFoundException('No cocktail found')
    }
  }



  async getCocktailById(id: number): Promise<cocktailEntity | null> {
    const cocktail = await this.prisma.cocktail.findUnique({
      where: { cocktail_id: id },
    });
    if (!cocktail) {
      throw new NotFoundException(`Cocktail with ID ${id} not found`);
    }

    return cocktail;
  }

  async deleteCocktail(id: number): Promise<{ message: string; deletedCocktail: cocktailEntity }> {
    try {
      const cocktail = await this.prisma.cocktail.findUnique({
        where: { cocktail_id: id },
      });

      if (!cocktail) {
        throw new NotFoundException(`Cocktail with ID ${id} not found`);
      }

      // Supprime toutes les relations avec le cocktail
      await this.prisma.$transaction([

        this.prisma.orderCocktail.deleteMany({
          where: { cocktail_id: id },
        }),

        this.prisma.cocktailIngredient.deleteMany({
          where: { cocktail_id: id },
        }),

        this.prisma.cocktail.delete({
          where: { cocktail_id: id },
        }),
      ]);

      return {
        message: `Cocktail with ID ${id} has been deleted`,
        deletedCocktail: cocktail
      };
    } catch (error) {
      console.error('Delete error:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete cocktail with ID ${id}`);
    }
  }


  async createCocktail(data: CreateCocktailDto): Promise<cocktailEntity> {
    return await this.prisma.cocktail.create({
      data: { ...data },
    });
  }


  async updateCocktail(id: number, data: UpdateCocktailDto): Promise<cocktailEntity> {
    try {
      return await this.prisma.cocktail.update({
        where: { cocktail_id: id },
        data: { ...data },
      });
    } catch (error) {
      throw new NotFoundException(`Cocktail with ID ${id} not found`);
    }
  }
}
