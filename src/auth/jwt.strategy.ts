import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // TODO: cookie'den falanda alırız custom extraction
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'dewamke',
    });
  }

  async validate(payload: any) {
    console.log(payload);
    return { userId: payload.sub, username: payload.username };
  }
}
