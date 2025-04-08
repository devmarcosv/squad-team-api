import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) { }

    // Cria um novo usuário
    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });
    }

    // Busca um usuário pelo email
    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    // Busca um usuário pelo ID
    async findById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({ where: { id }, data });
    }

    async deleteUser(id: number): Promise<User> {
        return this.prisma.user.delete({ where: { id } });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
}