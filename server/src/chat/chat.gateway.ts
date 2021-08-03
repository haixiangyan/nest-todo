import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageData } from './chat.interface';

@WebSocketGateway({
  path: '/chat/socket.io',
  cors: { origin: 'http://localhost:3000' },
})
export class ChatGateway {
  server: Server;

  @SubscribeMessage('clientToServer')
  async clientToServer(
    @MessageBody() clientData: MessageData,
  ): Promise<MessageData> {
    console.log('客户消息: ', clientData.content);
    return { content: '你好，我是小帅，很高兴为你服务！' };
  }
}
