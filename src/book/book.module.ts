import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { bookProviders } from './book.providers';
import { BookService } from './book.service';

@Module({
    imports: [DatabaseModule],
    providers: [...bookProviders, BookService]
})
export class BookModule {}
