import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderCocktailService {
  constructor(private readonly prisma: PrismaService) { }


  async DeleteCocktailInOrder(cocktail_id: number, order_id: number, quantity: number) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { order_id: order_id },
      });

      if (!order) {
        throw new NotFoundException('Commande non trouvée');
      }

      const cocktail = await this.prisma.orderCocktail.findUnique({
        where: { cocktail_id_order_id: { cocktail_id, order_id } },
      });

      if (!cocktail) {
        throw new NotFoundException(`Cocktail avec ID ${cocktail_id} non trouvé dans la commande`);
      }

      if (quantity > cocktail.quantity) {
        throw new BadRequestException('Quantité à supprimer supérieure à la quantité disponible');
      }

      if (cocktail.quantity === quantity) {
        await this.prisma.orderCocktail.delete({
          where: { cocktail_id_order_id: { cocktail_id, order_id } },
        });
        return { message: `Cocktail avec ID ${cocktail_id} supprimé de la commande ${order_id}` };
      }

      await this.prisma.orderCocktail.update({
        where: { cocktail_id_order_id: { cocktail_id, order_id } },
        data: {
          quantity: cocktail.quantity - quantity,
        },
      });

      return {
        message: `Quantité du cocktail ${cocktail_id} mise à jour. Nouvelle quantité: ${cocktail.quantity - quantity}`,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

}
