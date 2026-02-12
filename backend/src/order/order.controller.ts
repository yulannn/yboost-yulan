import { Body, Controller, Post, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/CreateOrderDto';
import { UpdateOrderDto } from './dto/UpdateOrderDto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new order',
    description: 'This endpoint allows creating a new order with the provided details.',
  })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. The provided data is invalid.',
  })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    console.log('createOrderDto:', createOrderDto);
    return await this.orderService.createOrder(createOrderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all orders',
    description: 'Retrieve a list of all orders.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of orders successfully retrieved.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid or missing authentication.',
  })
  async getAllOrder() {
    return await this.orderService.getAllOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the order to found.' })
  @ApiResponse({ status: 200, description: 'Order found' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrderByid(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.getOrdersByID(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order', description: 'Deletes an order by its ID.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the order to delete.' })
  @ApiResponse({ status: 200, description: 'Ingredient successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Ingredient not found.' })
  async deleteOrderById(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.deleteOrder(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an order', description: 'Updates an order by its ID.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the order to update.' })
  @ApiResponse({ status: 200, description: 'Order successfully updated.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async updateOrder(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    console.log('controller', updateOrderDto)
    return await this.orderService.updateOrder(id, updateOrderDto);
  }
}
