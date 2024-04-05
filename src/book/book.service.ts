import { Inject, Injectable } from '@nestjs/common';
import { BOOK_REPOSITORY } from './book.providers';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';

@Injectable()
export class BookService {
    constructor(@Inject(BOOK_REPOSITORY) private _bookRepository: Repository<BookEntity>) { }

    getBooks(): Promise<BookEntity[]> {
        return this._bookRepository.find({})
    }

    findBookById(bookId: number): Promise<BookEntity> {
        return this._bookRepository.findOne({ where: { id: bookId } });
    }

    addBook(bookDto: Pick<BookEntity, 'title' | 'author' | 'description' | 'year'> & { userId: number }) {
        return this._bookRepository.save({ ...bookDto, user: { id: bookDto.userId}})
    }

    updateBook(bookId: number, bookDto: Pick<BookEntity, 'title' | 'author' | 'description' | 'year'>) {
        return this._bookRepository.update({ id: bookId }, bookDto)
    }

    async deleteBook(bookId: number): Promise<void> {
        await this._bookRepository.softDelete({ id: bookId });
        return 
    }
}
