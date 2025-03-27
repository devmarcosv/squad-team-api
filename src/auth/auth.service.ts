import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@prisma/client';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private emailService: EmailService,
        private prisma: PrismaService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (user && bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;

            return result
        }

        return null
    }

    //TODO: Implementar o método de login, token sendo gerado com senha incorreta

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

        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return;
        }

        const token = uuidv4();
        const expiresAt = new Date(Date.now() + 3600000); // 1 hora

        await this.prisma.passwordResetToken.upsert({
            where: { email },
            update: { token, expiresAt },
            create: { token, email, expiresAt },
        });

        await this.emailService.sendPasswordResetEmail(email, token);
    }

    async resetPassword(token: string, newPassword: string): Promise<boolean> {

        const resetToken = await this.prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!resetToken || resetToken.expiresAt < new Date()) {
            return false;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log(hashedPassword);

        // 4. Atualiza a senha do usuário
        await this.prisma.user.update({
            where: { email: resetToken.email },
            data: { password: hashedPassword },
        });

        // 5. Deleta o token (para não ser reutilizado)
        await this.prisma.passwordResetToken.delete({
            where: { token },
        });

        return true;
    }

    async validateResetToken(token: string): Promise<boolean> {
        const resetToken = await this.prisma.passwordResetToken.findUnique({
            where: { token },
        });
        return !!resetToken && resetToken.expiresAt > new Date();
    }
}
