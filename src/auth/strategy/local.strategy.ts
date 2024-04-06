import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserJwt } from 'src/shared/types';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<UserJwt | false> {
        const userDto = await this.authService.validateUserViaPassword({ username, password });

        if (!userDto) {
            return false;
        }

        return userDto;
    }
}
