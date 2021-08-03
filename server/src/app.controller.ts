import { CACHE_MANAGER, Controller, Get, Inject, Post } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { SkipJwtAuth } from './auth/constants';

@ApiTags('主应用')
@SkipJwtAuth()
@Controller()
export class AppController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get('count')
  async getCount() {
    const count: number = await this.cacheManager.get('count');
    return { count: count || 0 };
  }

  @Post('count')
  async updateCount() {
    const { count } = await this.getCount();
    await this.cacheManager.set('count', count + 1, { ttl: 0 });
    return { count: count + 1 };
  }
}
