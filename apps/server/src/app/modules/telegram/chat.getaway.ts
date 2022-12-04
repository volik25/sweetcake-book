import { Injectable } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { bold, fmt } from 'telegraf/format';
import { TelegramService } from './telegram.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGetaway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private telegramService: TelegramService) {
    this.telegramService.sendMessage$.subscribe((m) => {
      this.server.to(m.socketId).emit('messageInput', m.message);
    });
  }

  handleConnection(client: Socket) {
    console.log(`Connected ${client.id}`);
    client.join(client.id);
  }
  handleDisconnect(client: Socket) {
    console.log(`Disconnected ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { isAdmin?: boolean; message: string },
    @ConnectedSocket() client: Socket
  ): void {
    this.telegramService.sendMessage(
      fmt`Новое сообщение из чата\n${bold`Id клиента: `}${client.id}\n\n${data}`
    );
  }
}
