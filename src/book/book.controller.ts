import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Request as RequestType } from 'express';

import { BookService } from './book.service';
import { Book, UserJwt } from 'src/shared/types';

@Controller('books')
export class BookController {
    constructor(private readonly _bookService: BookService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post()
    createBook(
        @Request() request: RequestType & { user: UserJwt },
        @Body() dto: Pick<Book, "title" | "author" | "description" | "year">) {
        const user: UserJwt = request.user;
        console.log(user)
        return this._bookService.addBook({ ...dto, userId: user.id });
    }
}
