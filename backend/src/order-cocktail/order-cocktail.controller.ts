import { Body, Controller, Param, Patch, Post, ParseIntPipe, Get } from '@nestjs/common';
import { OrderCocktailService } from './order-cocktail.service';
import { orderCocktailDto } from './dto/orderCocktail.dto';

@Controller('order-cocktail')
export class OrderCocktailController {
  constructor(private readonly orderCocktailService: OrderCocktailService) { }

  @Patch(':orderId/cocktailId')
  async DeleteCocktailInOrder(
    @Param('orderId') order_id: number,
    @Param('cocktailId') cocktail_id: number,
    @Body() { quantity }: { quantity: number }
  ) {
    console.log(`Received PATCH request for Order ID: ${order_id}, Cocktail ID: ${cocktail_id}, Quantity: ${quantity}`);
    return await this.orderCocktailService.DeleteCocktailInOrder(order_id, cocktail_id, quantity);
  }



}
