import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @UseGuards(AuthGuard('jwt')) // Protege a rota com JWT

    @Post()
    async createUser(@Body() data: { email: string, password: string, role: string }) {
        return this.userService.createUser(data);

    }

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<User | null> {
        return this.userService.findById(Number(id));
    }


    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<User> {
        return this.userService.deleteUser(id);
    }

    @Get('email/:email')
    async findByEmail(@Param('email') email: string): Promise<User | null> {
        return this.userService.findByEmail(email);
    }
}
