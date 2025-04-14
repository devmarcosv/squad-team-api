import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SteamModule } from './steam/steam.module';
import { EmailModule } from './email/email.module';
import { TeamModule } from './team/team.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    SteamModule,
    EmailModule,
    TeamModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
