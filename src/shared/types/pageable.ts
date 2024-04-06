export type OrderDirection = 'ASC' | 'DESC';

export type Pageable = {
    take: number;
    skip: number;
    order: {
        [columnName: string]: OrderDirection;
    };
};
