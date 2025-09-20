import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { jwtConstants } from './constant'; // make sure you have this file
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.token || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { rest: User }) {
    const { rest } = payload;
    return {
      userId: rest?.id,
      firstName: rest?.firstName,
      lastName: rest?.lastName,
      phoneNumber: rest?.phoneNumber,
      role: rest?.role,
    };
  }
}
