import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterDto, User, UserJwt } from 'src/shared/types';
import { Request as RequestType } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller('users')
export class AuthController {
    constructor(private readonly _authService: AuthService) { }
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() request: RequestType & { user: UserJwt }) {
        const user: UserJwt = request.user;
        console.log(request.user)
        return this._authService.login(user);
    }

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this._authService.register(dto);
    }

}
