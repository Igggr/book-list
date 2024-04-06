import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { USER_REPOSITORY } from './user.providers';
import { User } from 'src/shared/types';
import { hashPassword } from 'src/shared/utils';


@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY) private _userRepository: Repository<UserEntity>,
    ) { }
    
    async createUser(dto: Pick<User, 'username' | 'email' | 'password'>): Promise<UserEntity> {
        return this._userRepository.save({ ...dto, password: await hashPassword(dto.password) });
    }

    findByUsername(username: string) {
        return this._userRepository.findOne({where: { username }})
    }

    findByEmail(email: string) {
        return this._userRepository.findOne({ where: { email } })
    }
}
