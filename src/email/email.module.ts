import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailOptions } from './interfaces/IEmail.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'EMAIL_OPTIONS', // InjectionToken
      useFactory: (configService: ConfigService): EmailOptions => ({
        host: configService.getOrThrow<string>('EMAIL_HOST'),
        port: configService.getOrThrow<number>('EMAIL_PORT'),
        auth: {
          user: configService.getOrThrow<string>('EMAIL_USER'),
          pass: configService.getOrThrow<string>('EMAIL_PASSWORD'),
        },
        from: configService.get<string>('EMAIL_FROM'),
      }),
      inject: [ConfigService],
    },
    EmailService,
    PrismaService
  ],
  exports: [EmailService],
})
export class EmailModule { }