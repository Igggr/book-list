import { Body, Controller, Post, UseGuards, Request, Delete, Param, ParseIntPipe, Get, Put, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Request as RequestType } from 'express';

import { BookService } from './book.service';
import { UserJwt, AddBookDto, Pageable, BookFilterable, PageableDTO, BookFilterableDTO } from 'src/shared/types';
import { OwnerGuard } from './owner.guard';
import { parseQuery, pick } from 'src/shared/utils';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, IntersectionType, PartialType } from '@nestjs/swagger';
import { AddBookDTO } from './dto/addBookDto';
import { BookDTO } from './dto/bookDto';

@Controller('books')
export class BookController {
    constructor(private readonly _bookService: BookService) {}
    
    @ApiBody({ type: AddBookDTO })
    @ApiResponse({type: BookDTO })
    @ApiOperation({ summary: 'Добавление новой книги' })
    @UseGuards(JwtAuthGuard)
    @Post()
    createBook(
        @Request() request: RequestType & { user: UserJwt },
        @Body() dto: AddBookDTO) {
        const user: UserJwt = request.user;
        return this._bookService.addBook({ ...dto, userId: user.id });
    }

    @ApiResponse({ type: [BookDTO] })
    @ApiOperation({ summary: 'Получение списка книг' })
    @ApiQuery({type: IntersectionType(PageableDTO, BookFilterableDTO)})
    @Get()
    getBooks(@Query() query: Partial<Pageable & BookFilterable>) {
        const pageableKeys = ['take', 'order', 'skip'] as const;
        const filterableKeys = ['author', 'year'] as const;

        const pageable: Partial<Pageable> = parseQuery(pick(pageableKeys, query));
        const filterable: Partial<BookFilterable> = parseQuery(pick(filterableKeys, query))

        return this._bookService.getBooks({pageable, filterable});
    }

    @ApiResponse({ type: BookDTO })
    @ApiOperation({ summary: 'получение детальной информации о книге по ID'})
    @Get("/:id")
    getBook(@Param('id', ParseIntPipe) id: number) {
        return this._bookService.findBookById(id, false);
    }

    @ApiBearerAuth('defaultBearerAuth')
    @ApiBody({ type: PartialType(AddBookDTO) })
    @ApiOperation({ summary: 'Обновление информации о книге по ID' })
    @UseGuards(JwtAuthGuard, OwnerGuard)
    @Put('/:id')
    updateBook(
        @Request() request: RequestType & { user: UserJwt },
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: Partial<AddBookDto>,
    ) {
        this._bookService.updateBook(id, dto);
        return 'Ok';
    }

    @ApiBearerAuth('defaultBearerAuth')
    @ApiOperation({ summary: 'Удаление книги по ID' })
    @UseGuards(JwtAuthGuard, OwnerGuard)
    @Delete('/:id')
    deleteBook(
        @Request() request: RequestType & { user: UserJwt },
        @Param('id', ParseIntPipe) id: number,
    ) {
        this._bookService.deleteBook(id);
        return 'Ok';
    }
}
