import { Inject, Injectable } from '@nestjs/common';
import { BOOK_REPOSITORY } from './book.providers';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { AddBookDto, BookFilterable, Pageable } from 'src/shared/types';

@Injectable()
export class BookService {
    constructor(@Inject(BOOK_REPOSITORY) private _bookRepository: Repository<BookEntity>) { }

    getBooks({ pageable, filterable}: { pageable: Partial<Pageable>, filterable: Partial<BookFilterable>}): Promise<BookEntity[]> {
        return this._bookRepository.find({
            where: {
                ...(filterable ? filterable : {})
            },
            ...(pageable ? pageable : {}),
            order: (pageable?.order ? pageable.order: {id: 'ASC'})
        })
    }

    findBookById(bookId: number): Promise<BookEntity> {
        return this._bookRepository.findOne({ where: { id: bookId }, relations: ['owner'] });
    }

    addBook(bookDto: AddBookDto & { userId: number }) {
        return this._bookRepository.save({ ...bookDto, owner: { id: bookDto.userId } })
    }

    updateBook(bookId: number, bookDto: Partial<AddBookDto>) {
        return this._bookRepository.update({ id: bookId }, bookDto)
    }

    async deleteBook(bookId: number): Promise<void> {
        await this._bookRepository.softDelete({ id: bookId });
        return 
    }
}
