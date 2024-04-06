import { Book } from "./book";

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    books: Book;
}