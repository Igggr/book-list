import { AppDataSource } from "src/database/data-source";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { DATABASE_CONNECTION } from "src/database/database.providers";

export const USER_REPOSITORY = 'USER_REPOSITORY';

export const userProviders = [
    {
        provide: USER_REPOSITORY,
        useFactory: (): Repository<UserEntity> => AppDataSource.getRepository(UserEntity),
        inject: [DATABASE_CONNECTION],
    },
];