import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { EmailModule } from 'src/email/email.module';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PrismaModule,
    EmailModule,
    JwtModule.register({
      secret: process.env.JWT_TOKEN, // Usa a variável de ambiente
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
  exports: [AuthService], // Exporta o AuthService para uso em outros módulos
})
export class AuthModule { }