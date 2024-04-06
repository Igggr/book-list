import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';


@Module({
    imports: [
        PassportModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET as string,
            signOptions: { expiresIn: '7d' },
        }),
        UserModule,
    ],
    providers: [AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController]
})
export class AuthModule {}
