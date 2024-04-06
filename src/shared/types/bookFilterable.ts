import { ApiPropertyOptional } from "@nestjs/swagger";
import { Book } from "./book";

export type BookFilterable = Pick<Book, 'author' | 'year'>;

export class BookFilterableDTO implements BookFilterable {
    @ApiPropertyOptional({ example: 'Lê Nguyên Hoang'})
    author: string;

    @ApiPropertyOptional({ example: 2018 })
    year: number;
}