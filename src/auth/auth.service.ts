import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, User, UserJwt } from 'src/shared/types';
import { isSameHash, toUserJwt } from 'src/shared/utils';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private _userService: UserService,
        private _jwtService: JwtService,
    ) { }
    
    async validateUserViaPassword(username: string, password: string): Promise<UserJwt | null> {
        const user = await this._userService.findByUsername(username)
        if (user && await isSameHash(password, user.password)) {
            return toUserJwt(user);
        }
        return null;
    }
    
    async validateUserViaUsername(payload: UserJwt): Promise<UserJwt | null>  {
        const user = await this._userService.findByUsername(payload.username);
        if (!user) {
            return null;
        }
        return user;
    }

    login(user: UserJwt) {
        return {
            accessToken: this._jwtService.sign(user),
        };
    }

    async register(dto: RegisterDto) {
        const user = await this._userService.findByEmail(dto.email);
        if (user) {
            throw new HttpException(`Email ${dto.email} is already used`, HttpStatus.BAD_REQUEST);
        }
        const newUser = await this._userService.createUser(dto);
        return {
            accessToken: this._jwtService.sign(toUserJwt(newUser))
        }
    }

}
