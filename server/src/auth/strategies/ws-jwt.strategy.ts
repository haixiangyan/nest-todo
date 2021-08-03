import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { UserService } from '../../user/user.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'ws-jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: (req) => {
        if (!req.headers) {
          return () => null;
        }

        return ExtractJwt.fromAuthHeaderAsBearerToken();
      },
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const existUser = this.userService.findOne(payload.sub);

    if (!existUser) {
      throw new WsException('无法通过验证');
    }

    return { ...payload, id: payload.sub };
  }
}
