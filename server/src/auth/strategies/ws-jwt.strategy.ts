import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { UserService } from '../../user/user.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'ws-jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: (req) => {
        const { authorization } = req.handshake.headers;
        if (!authorization) {
          return null;
        }

        const [, token] = authorization.split(' ');

        return token;
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
