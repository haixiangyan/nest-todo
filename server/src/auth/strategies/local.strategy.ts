import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { ReportLogger } from '../../log/ReportLogger';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private moduleRef: ModuleRef,
    private reportLogger: ReportLogger,
  ) {
    super({ passReqToCallback: true });
    this.reportLogger.setContext('LocalStrategy');
  }

  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const contextId = ContextIdFactory.getByRequest(request);

    // 现在 authService 是一个 request-scoped provider
    const authService = await this.moduleRef.resolve(AuthService, contextId);

    const user = await authService.validateUser(username, password);

    if (!user) {
      this.reportLogger.error('无法登录，SB');
      throw new UnauthorizedException();
    }

    return user;
  }
}
