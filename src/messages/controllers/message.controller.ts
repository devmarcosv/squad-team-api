import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { MessagesService } from '../service/message.service';
import { CreateMessageDto } from '../database/dto/message.dto';

@Controller('messages')
export class MessagesController {
    constructor(private readonly service: MessagesService) { }

    @Post()
    sendMessage(@Body() dto: CreateMessageDto) {
        return this.service.sendMessage(dto);
    }

    @Get('conversation')
    getConversation(
        @Query('userA') userA: number,
        @Query('userB') userB: number,
    ) {
        return this.service.getConversationBetween(userA, userB);
    }
}
