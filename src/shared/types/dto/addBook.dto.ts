import { Book } from "../book";

export type AddBookDto = Pick<Book, "title" | "author" | "description" | "year">;