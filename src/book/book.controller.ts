import { Body, Controller, Post, UseGuards, Request, Delete, Param, ParseIntPipe, Get, Put, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Request as RequestType } from 'express';

import { BookService } from './book.service';
import { UserJwt, AddBookDto, Pageable, BookFilterable } from 'src/shared/types';
import { OwnerGuard } from './owner.guard';
import { parseQuery, pick } from 'src/shared/utils';

@Controller('books')
export class BookController {
    constructor(private readonly _bookService: BookService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post()
    createBook(
        @Request() request: RequestType & { user: UserJwt },
        @Body() dto: AddBookDto) {
        const user: UserJwt = request.user;
        console.log(user)
        return this._bookService.addBook({ ...dto, userId: user.id });
    }

    @Get()
    getBooks(@Query() query: Partial<Pageable & BookFilterable>) {
        const pageableKeys = ['take', 'order', 'skip'] as const;
        const filterableKeys = ['author', 'year'] as const;

        const pageable: Partial<Pageable> = parseQuery(pick(pageableKeys, query));
        const filterable: Partial<BookFilterable> = parseQuery(pick(filterableKeys, query))

        return this._bookService.getBooks({pageable, filterable});
    }

    @Get()
    getBook(@Param('id', ParseIntPipe) id: number) {
        return this._bookService.findBookById(id);
    }

    @UseGuards(JwtAuthGuard, OwnerGuard)
    @Put('/:id')
    updateBook(
        @Request() request: RequestType & { user: UserJwt },
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: Partial<AddBookDto>,
    ) {
        return this._bookService.updateBook(id, dto);
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
