import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@prisma/client';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private emailService: EmailService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (user && bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;

            return result
        }

        return null
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password)

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }


    async register(email: string, password: string, role?: string): Promise<User> {
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('Este e-mail já está em uso');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            email,
            password: hashedPassword,
            role: role || 'USER',
        };

        return this.usersService.createUser(userData);
    }

    async requestPasswordReset(email: string): Promise<void> {
        // 1. Gerar token único
        const token = uuidv4();
        const expiresAt = new Date(Date.now() + 3600000); // Expira em 1 hora


        // 3. Enviar email com o token
        await this.emailService.sendPasswordResetEmail(email, token);
    }
}
