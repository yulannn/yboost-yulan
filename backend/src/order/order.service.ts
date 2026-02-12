import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/CreateOrderDto';
import { UpdateOrderDto } from './dto/UpdateOrderDto';
import { orderEntity } from './entities/orderEntity';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) { }

  async createOrder(createOrderDto: CreateOrderDto): Promise<orderEntity> {
    const { nb_table, state, employee_id, orderCocktails } = createOrderDto;

    try {
      const order = await this.prisma.order.create({
        data: {
          nb_table,
          state,
          employee_id,
          orderCocktails: {
            create: orderCocktails.map((cocktail) => ({
              cocktail_id: cocktail.cocktail_id,
              quantity: cocktail.quantity,
            })),
          },
        },
        include: {
          orderCocktails: true,
        },
      });

      return order;
    } catch (error) {
      throw new Error('Failed to create order: ' + error.message);
    }
  }


  async getAllOrders(): Promise<orderEntity[] | null> {
    try {
      const orders = await this.prisma.order.findMany({
        include: {
          orderCocktails: true,
        },
      });
      return orders
    } catch (error) {
      throw new NotFoundException(`No orders found`);
    }
  }

  async getOrdersByID(id: number): Promise<orderEntity | null> {
    const orders = await this.prisma.order.findUnique({
      where: {
        order_id: id
      },
      include: {
        orderCocktails: true,
      },
    })
    if (!orders) {
      throw new NotFoundException(
        `Order with ID ${id} not found`,
      );
    }
    return orders;
  }


  async deleteOrder(id: number): Promise<orderEntity> {

    await this.prisma.orderCocktail.deleteMany({
      where: { order_id: id },
    });

    const order = await this.prisma.order.delete({
      where: { order_id: id },
      include: {
        orderCocktails: true,
      },
    });
    return order;
  }

  async calculateRequiredIngredients(orderId: number): Promise<Map<number, number>> {
    const order = await this.prisma.order.findUnique({
      where: { order_id: orderId },
      include: {
        orderCocktails: {
          include: {
            cocktail: {
              include: {
                cocktailIngredients: {
                  include: {
                    ingredient: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!order) {
      throw new Error('Commande non trouvée');
    }

    const requiredIngredients = new Map<number, number>();

    for (const orderCocktail of order.orderCocktails) {
      for (const cocktailIngredient of orderCocktail.cocktail.cocktailIngredients) {
        const ingredientId = cocktailIngredient.ingredient.ingredient_id;
        const currentQuantity = requiredIngredients.get(ingredientId) || 0;
        requiredIngredients.set(
          ingredientId,
          currentQuantity + (cocktailIngredient.quantity * orderCocktail.quantity)
        );
      }
    }

    return requiredIngredients;
  }

  async updateStockForOrder(orderId: number): Promise<void> {
    console.log('Début de updateStockForOrder pour la commande:', orderId);
    const requiredIngredients = await this.calculateRequiredIngredients(orderId);
    console.log('Ingrédients requis:', Object.fromEntries(requiredIngredients));

    const order = await this.prisma.order.findUnique({
      where: { order_id: orderId },
      include: {
        orderCocktails: true
      }
    });

    if (!order) {
      throw new Error('Commande non trouvée');
    }

    // Vérifier si le stock est suffisant
    for (const [ingredientId, requiredQuantity] of requiredIngredients) {
      const ingredient = await this.prisma.ingredient.findUnique({
        where: { ingredient_id: ingredientId }
      });

      if (!ingredient) {
        throw new Error(`Ingrédient ${ingredientId} non trouvé`);
      }

      console.log(`Vérification du stock pour ${ingredient.name}:`, {
        stockActuel: ingredient.stock,
        quantiteRequise: requiredQuantity
      });

      if (ingredient.stock < requiredQuantity) {
        throw new Error(`Stock insuffisant pour l'ingrédient ${ingredient.name}`);
      }
    }

    // Mettre à jour le stock
    for (const [ingredientId, requiredQuantity] of requiredIngredients) {
      const ingredient = await this.prisma.ingredient.findUnique({
        where: { ingredient_id: ingredientId }
      });

      console.log(`Mise à jour du stock pour ${ingredient.name}:`, {
        stockAvant: ingredient.stock,
        decrement: requiredQuantity
      });

      await this.prisma.ingredient.update({
        where: { ingredient_id: ingredientId },
        data: {
          stock: {
            decrement: requiredQuantity
          }
        }
      });

      const updatedIngredient = await this.prisma.ingredient.findUnique({
        where: { ingredient_id: ingredientId }
      });

      console.log(`Stock après mise à jour pour ${ingredient.name}:`, updatedIngredient.stock);
    }
  }

  async restoreStockForOrder(orderId: number): Promise<void> {
    const requiredIngredients = await this.calculateRequiredIngredients(orderId);

    for (const [ingredientId, requiredQuantity] of requiredIngredients) {
      await this.prisma.ingredient.update({
        where: { ingredient_id: ingredientId },
        data: {
          stock: {
            increment: requiredQuantity
          }
        }
      });
    }
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto): Promise<orderEntity> {
    console.log('Début de updateOrder:', { id, updateOrderDto });

    const order = await this.prisma.order.findUnique({
      where: { order_id: id },
      include: {
        orderCocktails: true
      }
    });

    if (!order) {
      throw new NotFoundException(`Commande avec l'ID ${id} non trouvée`);
    }

    console.log('État actuel de la commande:', order.state);
    console.log('Nouvel état demandé:', updateOrderDto.state);

    // Si la commande passe en "completed", mettre à jour le stock
    if (updateOrderDto.state === 'completed' && order.state !== 'completed') {
      console.log('Mise à jour du stock pour la commande completed');
      await this.updateStockForOrder(id);
    }
    // Si la commande passe de "completed" à un autre état, restaurer le stock
    else if (order.state === 'completed' && updateOrderDto.state !== 'completed') {
      console.log('Restauration du stock pour la commande non completed');
      await this.restoreStockForOrder(id);
    }

    const updatedOrder = await this.prisma.order.update({
      where: { order_id: id },
      data: updateOrderDto,
      include: {
        orderCocktails: true
      }
    });

    console.log('Commande mise à jour avec succès:', updatedOrder);
    return updatedOrder;
  }


}
