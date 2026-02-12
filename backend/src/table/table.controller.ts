import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/CreateTableDto';
import { UpdateTableDto } from './dto/UpdateTableDto';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';
import { TableDto } from './dto/TableDto';

@ApiTags('Tables')
@Controller('table')
export class TableController {
  constructor(private readonly tableservice: TableService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all tables' })
  @ApiOkResponse({
    description: 'List of tables retrieved successfully',
    type: TableDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'No tables found' })
  async getAllTables() {
    return await this.tableservice.getAllTables();
  }

  @Post()
  @ApiOperation({ summary: 'Create a table' })
  @ApiOkResponse({ description: 'Table created successfully', type: TableDto })
  async createTable(@Body() data: CreateTableDto) {
    return await this.tableservice.createTable(data);
  }

  @Get(':no')
  @ApiOperation({ summary: 'Fetch a table by its number' })
  @ApiOkResponse({ description: 'Table retrieved successfully', type: TableDto })
  @ApiNotFoundResponse({ description: 'Table not found' })
  async getTableByNo(@Param('no', ParseIntPipe) no: number) {
    return await this.tableservice.getTableByNo(no);
  }

  @Get('order/:no')
  @ApiOperation({ summary: 'Fetch orders for a specific table' })
  @ApiOkResponse({ description: 'Orders retrieved successfully,' })
  @ApiNotFoundResponse({ description: 'Orders not found for the specified table' })
  async getOrdersForTable(@Param('no', ParseIntPipe) no: number) {
    return await this.tableservice.getTableOrdersByNo(no);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a table by its ID' })
  @ApiOkResponse({ description: 'Table deleted successfully' })
  @ApiNotFoundResponse({ description: 'Table not found' })
  async deleteOrderById(@Param('id', ParseIntPipe) id: number) {
    return await this.tableservice.deleteTable(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a table by its ID' })
  @ApiOkResponse({ description: 'Table updated successfully', type: TableDto })
  @ApiNotFoundResponse({ description: 'Table not found' })
  async updateTable(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTableDto,
  ) {
    return await this.tableservice.updateTable(id, data);
  }
}
