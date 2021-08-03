import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { WsJwtStrategy } from '../auth/strategies/ws-jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [ChatGateway, WsJwtStrategy],
})
export class ChatModule {}
