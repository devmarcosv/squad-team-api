import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesRepository } from './database/repositories/message.repository';
import { MessagesService } from './service/message.service';
import { MessagesController } from './controllers/message.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule], // Importa o PrismaModule para usar o PrismaService
    controllers: [MessagesController],
    providers: [MessagesService, MessagesRepository, PrismaService],
    exports: [MessagesService], // Exporta o UsersService para uso em outros módulos
})
export class MessagesModule { }
