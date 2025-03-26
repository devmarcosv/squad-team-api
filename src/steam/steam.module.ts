import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Importe o HttpModule
import { ConfigModule } from '@nestjs/config'; // Importe o ConfigModule
import { SteamService } from './steam.service';
import { SteamController } from './steam.controller';

@Module({
  imports: [
    HttpModule, // Adicione o HttpModule aqui
    ConfigModule.forRoot(), // Adicione o ConfigModule configurado
  ],
  controllers: [SteamController],
  providers: [SteamService],
})
export class SteamModule { }