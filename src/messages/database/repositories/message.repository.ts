import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from '../dto/message.dto';

@Injectable()
export class MessagesRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateMessageDto) {
        return this.prisma.message.create({
            data,
        });
    }

    async getConversation(userA: number, userB: number) {
        return this.prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userA, receiverId: userB },
                    { senderId: userB, receiverId: userA },
                ],
            },
            orderBy: { sentAt: 'asc' },
        });
    }
}
