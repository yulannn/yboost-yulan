import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/createIngredientDto';
import { UpdateIngredientDto } from './dto/updateIngredientDto';

@ApiTags('Ingredients')
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  @ApiOperation({ summary: 'Get all ingredients', description: 'Fetches all ingredients from the database.' })
  @ApiResponse({ status: 200, description: 'Returns a list of all ingredients.' })
  async getAllIngredient() {
    return await this.ingredientService.getAllIngredient();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ingredient by ID', description: 'Fetches a specific ingredient by its ID.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the ingredient to fetch.' })
  @ApiResponse({ status: 200, description: 'Returns the ingredient data.' })
  @ApiResponse({ status: 404, description: 'Ingredient not found.' })
  async getIngredientById(@Param('id', ParseIntPipe) id: number) {
    return await this.ingredientService.getIngredientById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ingredient', description: 'Deletes an ingredient by its ID.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the ingredient to delete.' })
  @ApiResponse({ status: 200, description: 'Ingredient successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Ingredient not found.' })
  async deleteIngredient(@Param('id', ParseIntPipe) ingredientId: number) {
    return await this.ingredientService.deleteIngredient(ingredientId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new ingredient', description: 'Creates a new ingredient with the provided data.' })
  @ApiResponse({ status: 201, description: 'Ingredient successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  async createIngredient(@Body() data: CreateIngredientDto) {
    return await this.ingredientService.createIngredient(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an ingredient', description: 'Updates an existing ingredient by its ID.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the ingredient to update.' })
  @ApiResponse({ status: 200, description: 'Ingredient successfully updated.' })
  @ApiResponse({ status: 404, description: 'Ingredient not found.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  async updateIngredient(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateIngredientDto) {
    return await this.ingredientService.updateIngredient(id, data);
  }
}
