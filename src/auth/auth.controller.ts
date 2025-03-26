import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        return this.authService.login(email, password);
    }

    @Post('register')
    async register(@Body() data: { email: string, password: string, role: string }) {
        return this.authService.register(data.email, data.password, data.role);
    }

    @UseGuards(AuthGuard('jwt')) // Protege a rota com JWT
    @Post('profile')
    async getProfile(@Request() req) {
        return req.user; // O usuário está disponível no objeto `req` após a autenticação
    }

    @Post('request-reset')
    async requestReset(@Body('email') email: string) {
        await this.authService.requestPasswordReset(email);
        return { message: 'Email de redefinição enviado' };
    }
}