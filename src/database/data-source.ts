const dotenv = require('dotenv');
import { DataSource } from "typeorm";
import { parse } from 'pg-connection-string';
import { UserEntity } from "src/user/user.entity";
import { BookEntity } from "src/book/book.entity";
const path = require('path');

console.log('dotenv', dotenv);
dotenv.config({ path: '.development.env' });

const pgConfigMaster = parse(process.env.PG_URL_MASTER!);
console.log(pgConfigMaster)

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: pgConfigMaster.host!,
    port: Number(pgConfigMaster.port!),
    username: pgConfigMaster.user!,
    password: pgConfigMaster.password!,
    database: pgConfigMaster.database!,
    entities: [UserEntity, BookEntity],
    synchronize: true,
    logging: false,
    ssl: false,
    cache: true,
});
