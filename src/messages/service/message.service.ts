import { Injectable } from '@nestjs/common';
import { MessagesRepository } from '../database/repositories/message.repository';
import { CreateMessageDto } from '../database/dto/message.dto';

@Injectable()
export class MessagesService {
    constructor(private readonly repository: MessagesRepository) { }

    async sendMessage(dto: CreateMessageDto) {
        return this.repository.create(dto);
    }

    async getConversationBetween(userA: number, userB: number) {
        return this.repository.getConversation(userA, userB);
    }
}
