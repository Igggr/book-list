import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserJwt } from 'src/shared/types';
import { Request as RequestType } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { AccessToken } from './dto';


@Controller('users')
export class AuthController {
    constructor(private readonly _authService: AuthService) { }
    
    @ApiBody({ type: LoginDTO })
    @ApiResponse({type: AccessToken})
    @ApiOperation({ summary: 'Аутентификация' })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() request: RequestType & { user: UserJwt },
    ) {
        const user: UserJwt = request.user;
        return this._authService.login(user);
    }

    @ApiBody({ type: RegisterDTO })
    @ApiResponse({ type: AccessToken })
    @ApiOperation({ summary: 'Регистрация нового пользователя'})
    @Post('register')
    async register(@Body() dto: RegisterDTO) {
        return this._authService.register(dto);
    }

}
