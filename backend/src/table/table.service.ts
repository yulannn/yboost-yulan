import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableDto } from './dto/CreateTableDto';
import { tableEntity } from './entities/tableEntity';
import { UpdateTableDto } from './dto/UpdateTableDto';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) { }

  async getAllTables(): Promise<tableEntity[]> {
    const tables = await this.prisma.table.findMany({
      select: {
        table_no: true,
      },
    });

    if (tables.length === 0) {
      throw new NotFoundException('No tables found');
    }

    return tables;
  }


  async createTable(data: CreateTableDto): Promise<tableEntity> {
    const { table_no } = data;

    return await this.prisma.table.create({
      data: {
        table_no,
      },
    });
  }

  async getTableOrdersByNo(no: number): Promise<tableEntity | null> {
    const table = await this.prisma.table.findUnique({
      where: { table_no: no },
      include: {
        orders: true,
      },
    });

    if (!table) {
      throw new NotFoundException(`Table with no ${no} not found`);
    }

    return table;
  }

  async getAllTableOrder(): Promise<tableEntity[] | null> {
    const table = await this.prisma.table.findMany({
      include: {
        orders: true,
      },
    });

    if (table.length === 0) {
      throw new NotFoundException('no table found');
    }
    return table;
  }

  async deleteTable(no: number): Promise<tableEntity> {
    const table = await this.prisma.table.delete({
      where: { table_no: no },
    });
    return table;
  }

  async updateTable(no: number, data: UpdateTableDto): Promise<tableEntity> {
    try {
      const table = await this.prisma.table.update({
        where: { table_no: no },
        data: data,
      });
      return table;
    } catch (error) {
      throw new NotFoundException(`Table id ${no}} not found`);
    }
  }

  async getTableByNo(no: number): Promise<tableEntity | null> {
    const table = await this.prisma.table.findUnique({
      where: { table_no: no },
    });

    if (!table) {
      throw new NotFoundException(`Table with no ${no} not found`);
    }

    return table;
  }
}
