import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CocktailService } from './cocktail.service';
import { CreateCocktailDto } from './dto/CreateCocktailDto';
import { UpdateCocktailDto } from './dto/UpdateCocktailDto';

@Controller('cocktail')
export class CocktailController {
  constructor(private readonly cocktailService: CocktailService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all cocktails',
    description: 'Retrieve a list of all cocktails.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of cocktails successfully retrieved.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid or missing authentication.',
  })
  async getAllCocktail() {
    return await this.cocktailService.getAllCocktail();
  }

  @Get('allcocktail')
  async getAllCocktailsWithIngredients() {
    return this.cocktailService.getAllCocktailsWithIngredients();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a cocktail by ID',
    description: 'Retrieve a specific cocktail by its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Cocktail successfully retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cocktail not found.',
  })
  async getCocktailById(@Param('id', ParseIntPipe) id: number) {
    return await this.cocktailService.getCocktailById(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a cocktail by ID',
    description: 'Delete a specific cocktail by its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Cocktail successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cocktail not found.',
  })
  async deleteCocktail(@Param('id', ParseIntPipe) id: number) {
    return await this.cocktailService.deleteCocktail(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new cocktail',
    description: 'Create a new cocktail using the provided data.',
  })
  @ApiResponse({
    status: 201,
    description: 'Cocktail successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data provided.',
  })
  async createCocktail(@Body() data: CreateCocktailDto) {
    return await this.cocktailService.createCocktail(data);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a cocktail by ID',
    description: 'Update an existing cocktail using its ID and new data.',
  })
  @ApiResponse({
    status: 200,
    description: 'Cocktail successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cocktail not found.',
  })
  async updateCocktail(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCocktailDto,
  ) {
    return await this.cocktailService.updateCocktail(id, data);
  }
}
