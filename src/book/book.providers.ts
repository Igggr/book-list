import { AppDataSource } from "src/database/data-source";
import { Repository } from "typeorm";
import { DATABASE_CONNECTION } from "src/database/database.providers";
import { BookEntity } from "./book.entity";

export const BOOK_REPOSITORY = 'BOOK_REPOSITORY';

export const bookProviders = [
    {
        provide: BOOK_REPOSITORY,
        useFactory: (): Repository<BookEntity> => AppDataSource.getRepository(BookEntity),
        inject: [DATABASE_CONNECTION],
    },
];