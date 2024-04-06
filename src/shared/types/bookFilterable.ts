import { Book } from "./book";

export type BookFilterable = Pick<Book, 'author' | 'year'>;