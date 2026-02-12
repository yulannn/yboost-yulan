import * as bcrypt from 'bcryptjs';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from 'src/role/role.service';
import { NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/authLoginDto';
import { authRegisterDto } from './dto/authRegisterDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roleservice: RoleService,
    private readonly jwtService: JwtService,
  ) { }

  async register(data: authRegisterDto, res: any) {
    const { role_id, password, ...employeeData } = data;

    const usedMail = await this.prisma.employee.findUnique({
      where: { email: data.email },
    });

    if (usedMail) {
      throw new ConflictException('This mail is already used!');
    }

    const role = await this.roleservice.getRoleById(role_id);
    if (!role) {
      throw new NotFoundException('Role ID not found while creating user');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await this.prisma.employee.create({
      data: {
        ...employeeData,
        password: hashedPassword,
        role: {
          connect: { role_id },
        },
      },
    });

    const payload = { email: employee.email, sub: employee.employee_id };
    const access_token = this.jwtService.sign(payload);

    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });



    return res.json({ message: 'User registered successfully', employee });

  }

  async login(loginDto: LoginDto, res: any) {
    const employee = await this.prisma.employee.findUnique({
      where: { email: loginDto.email },
    });

    if (!employee) {
      throw new NotFoundException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, employee.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    const payload = { email: employee.email, sub: employee.employee_id };
    const access_token = this.jwtService.sign(payload);


    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ message: 'User login successfully', employee });
  }

  async logout(res: any) {
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      expires: new Date(0),
    });

    return res.json({ message: 'Logout successful' });
  }


  async me(token: any) {

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    try {
      const decoded = this.jwtService.verify(token);
      const employeeId = decoded.sub;
      if (!employeeId) {
        throw new UnauthorizedException('Invalid token');
      }

      const employee = await this.prisma.employee.findUnique({
        where: { employee_id: employeeId },
      });

      if (!employee) {
        throw new NotFoundException('User not found');
      }

      return employee;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

}  