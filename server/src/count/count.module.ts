import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CountController } from './count.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { host, port } = configService.get('redis');
        return {
          store: redisStore,
          host,
          port,
        };
      },
    }),
  ],
  controllers: [CountController],
})
export class CountModule {}
