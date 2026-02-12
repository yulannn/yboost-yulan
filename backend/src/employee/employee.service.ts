import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dto/CreateEmployeeDto';
import { RoleService } from '../role/role.service';
import { UpdateEmployeeDto } from './dto/UpdateEmployeeDto';
import { employeeEntity } from './entities/employeeEntity';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roleservice: RoleService,
  ) { }

  // Methode asynchrone qui return tous les employés
  // Si aucun employés trouvés, on renvoie une erreur
  // On exclut le password du return
  async getAllEmployee(): Promise<employeeEntity[] | null> {
    const employees = (await this.prisma.employee.findMany()).map(
      ({ password, ...employee }) => employee,
    );

    if (employees.length === 0) {
      throw new NotFoundException('No employees found');
    }
    return employees;
  }

  // Methode asynchrone qui return un employé via l'id en paramètre
  // Si l'employé n'est pas trouvé, return une erreur
  // On exclut le password du return
  async getEmployeeById(id: number): Promise<employeeEntity | null> {
    try {
      const { password, ...employee } = await this.prisma.employee.findUnique({
        where: {
          employee_id: id,
        },
      });
      return employee;
    } catch (error) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }


  // Methode asynchrone qui delete un employé via l'id en paramètre
  // Si l'id employé n'esst pas trouvé => renvoie une erreur
  // On exclut le password du return
  async deleteEmployee(id: number): Promise<employeeEntity> {
    try {
      const { password, ...employee } = await this.prisma.employee.delete({
        where: {
          employee_id: id,
        },
      });
      return employee;
    } catch (error) {
      throw new NotFoundException(`Employe avec l'id ${id} pas trouvé`);
    }
  }

  // Methode asynchrone qui update un employé via l'id en paramètre
  // Si l'id employé n'esst pas trouvé => renvoie une erreur
  // On exclut le password du return
  async updateEmployee(
    id: number,
    data: UpdateEmployeeDto,
  ): Promise<employeeEntity> {
    try {
      const { password, ...employee } = await this.prisma.employee.update({
        where: { employee_id: id },
        data: { ...data },
      });
      return employee;
    } catch (error) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}
