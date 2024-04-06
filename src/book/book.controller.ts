import { Body, Controller, Post, UseGuards, Request, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Request as RequestType } from 'express';

import { BookService } from './book.service';
import { Book, UserJwt } from 'src/shared/types';
import { OwnerGuard } from './owner.guard';

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

    @UseGuards(JwtAuthGuard, OwnerGuard)
    @Delete('/:id')
    deleteBook(
        @Request() request: RequestType & { user: UserJwt },
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this._bookService.deleteBook(id);
    }
}
