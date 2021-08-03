import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageData } from './chat.interface';
import { Cron, CronExpression } from '@nestjs/schedule';

@WebSocketGateway({
  path: '/chat/socket.io',
  cors: { origin: 'http://localhost:3000' },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('clientToServer')
  async clientToServer(
    @MessageBody() clientData: MessageData,
  ): Promise<MessageData> {
    console.log('客户消息: ', clientData.content);
    return { content: '你好，我是小帅，很高兴为你服务！' };
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async sayHi() {
    this.server.emit('serverToClient', { content: '你还在么？' });
  }
}
