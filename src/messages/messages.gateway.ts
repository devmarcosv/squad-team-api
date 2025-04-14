import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './service/message.service';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './database/dto/message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private onlineUsers = new Map<number, string>();// userId ->  socket.id

  constructor(private readonly messagesService: MessagesService) { }

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    const userId = Number(client.handshake.query.userId);
    if (userId) {
      this.onlineUsers.set(userId, client.id);
      console.log(`User ${userId} connected with socket ID: ${client.id}`);
    }

    return
  }

  handleDisconnect(client: Socket) {
    const disconnectedUserId = [...this.onlineUsers.entries()].find(
      ([_, socketId]) => socketId === client.id,
    )?.[0];

    if (disconnectedUserId) {
      this.onlineUsers.delete(disconnectedUserId);
      console.log(`Usuáro  ${disconnectedUserId} desconectado`);
    }
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() dto: CreateMessageDto,
    @ConnectedSocket() client: Socket,) {
    const savedMessage = await this.messagesService.sendMessage(dto);

    client.emit('message_sent', savedMessage);

    const receiverSocketId = this.onlineUsers.get(dto.receiverId);
    if (receiverSocketId) {
      // Notifica o receptor em tempo real
      this.server.to(receiverSocketId).emit('new_message', savedMessage);
    }

    return savedMessage;
  }


}
