import { ApiPropertyOptional } from "@nestjs/swagger";

export type OrderDirection = 'ASC' | 'DESC';

export type Pageable = {
    take: number;
    skip: number;
    order: {
        [columnName: string]: OrderDirection;
    };
};


export class PageableDTO implements Pageable {
    @ApiPropertyOptional({example: 0})
    skip: number;

    @ApiPropertyOptional({ example: 10 })
    take: number;

    @ApiPropertyOptional({example: {id: 'ASC'}})
    order: { [columnName: string]: OrderDirection; };

}