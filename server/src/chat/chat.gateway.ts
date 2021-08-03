import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageData } from './chat.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '../auth/guards/ws-jwt-auth.guard';

@WebSocketGateway({
  path: '/chat/socket.io',
  cors: { origin: 'http://localhost:3000' },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('clientToServer')
  async clientToServer(
    @MessageBody() clientData: MessageData,
  ): Promise<MessageData> {
    console.log('客户消息: ', clientData.content);
    return { content: '你好，我是小帅，很高兴为你服务！' };
  }

  @UseGuards(WsJwtAuthGuard)
  @Cron(CronExpression.EVERY_10_SECONDS)
  async sayHi() {
    this.server.emit('serverToClient', { content: '你还在么？' });
  }
}
