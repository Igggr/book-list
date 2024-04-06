import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Book } from "src/shared/types";

export class BookDTO implements Omit<Book, 'owner' | 'deletedAt'> {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: 1 })
    id: number;

    @IsNotEmpty()
    @ApiProperty({
        example: 'Lê Nguyên Hoang'
    })
    author: string;

    @IsNotEmpty()
    @ApiProperty({
        example: 'The Equation of Knowledge: From Bayes\' Rule to a Unified Philosophy of Science introduces readers to the Bayesian approach to science: teasing out the link between probability and knowledge.The author strives to make this book accessible to a ve...'})
    description: string;

    @IsNotEmpty()
    @ApiProperty({
        example: 'The Equation of Knowledge: From Bayes\' Rule to a Unified Philosophy of Science'

    })
    title: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 2018})
    year: number;
}