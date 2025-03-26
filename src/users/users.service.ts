import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client'
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async createUser(data: { email: string; password: string; role?: string }): Promise<User> {
        const userData = { ...data, role: data.role ?? 'USER' };
        return this.userRepository.createUser(userData);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async findById(id: number): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async deleteUser(id: number): Promise<User> {
        return this.userRepository.deleteUser(id);
    }
}
