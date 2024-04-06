import { ApiProperty, OmitType } from "@nestjs/swagger";
import { AddBookDto, Book } from "src/shared/types";

export class BookDTO implements Omit<Book, 'owner' | 'deletedAt'> {
    @ApiProperty({example: 1})
    id: number;

    @ApiProperty({
        example: 'Lê Nguyên Hoang'
    })
    author: string;

    @ApiProperty({
        example: 'The Equation of Knowledge: From Bayes\' Rule to a Unified Philosophy of Science introduces readers to the Bayesian approach to science: teasing out the link between probability and knowledge.The author strives to make this book accessible to a ve...'})
    description: string;

    @ApiProperty({
        example: 'The Equation of Knowledge: From Bayes\' Rule to a Unified Philosophy of Science'

    })
    title: string;

    @ApiProperty({example: 2018})
    year: number;
}