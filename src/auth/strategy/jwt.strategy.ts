import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


import { AuthService } from '../auth.service';
import { UserJwt } from 'src/shared/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly _authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET as string,
        });
    }

    async validate(payload: UserJwt): Promise<UserJwt | false> {
        const user = await this._authService.validateUserViaUsername(payload);

        if (!user) {
            return false;
        }

        return user;
    }
}
