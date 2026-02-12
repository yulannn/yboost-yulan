import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleDto } from './dto/RoleDto';
import { UpdateRoleDto } from './dto/UpdateRoleDto';
import { roleEntity } from './entities/roleEntity';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) { }

  // Méthode qui return tous les roles
  async getAllRole(): Promise<roleEntity[] | null> {
    const role = await this.prisma.role.findMany();
    if (role.length === 0) {
      throw new NotFoundException('No role found');
    }

    return role;
  }
  // Méthode qui return le role via l'id du role
  async getRoleById(id: number): Promise<roleEntity | null> {
    try {
      const role = await this.prisma.role.findUnique({
        where: {
          role_id: id,
        },
      });
      return role;
    } catch (error) {
      throw new NotFoundException(`Role with ${id} not found`);
    }
  }

  // Méthode async pour créer un role via le dto
  async createRole(data: RoleDto): Promise<roleEntity> {
    try {
      const role = await this.prisma.role.create({
        data: data,
      });
      return role;
    } catch (error) {
      throw new NotFoundException('Erreur création de role');
    }
  }

  // Méthode async pour update mes roles
  async updateRole(id: number, data: UpdateRoleDto): Promise<roleEntity> {
    try {
      const role = await this.prisma.role.update({
        where: { role_id: id },
        data: { ...data },
      });
      return role;
    } catch (error) {
      throw new NotFoundException(`Error update ${id}`);
    }
  }

  async deleteRole(id: number): Promise<roleEntity> {
    try {
      const role = await this.prisma.role.delete({
        where: { role_id: id },
      });
      return role;
    } catch (error) {
      throw new NotFoundException(`Erreur delete role ${id}`);
    }
  }
}
