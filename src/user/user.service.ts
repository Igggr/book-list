import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { USER_REPOSITORY } from './user.providers';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY) private _userRepository: Repository<UserEntity>,
    ) { }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    private checkPassword(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }
    
    async createUser(dto: Pick<UserEntity, 'username' | 'email' | 'password'>): Promise<UserEntity> {
        return this._userRepository.save({ ...dto, password: await this._hashPassword(dto.password) });
    }
}
