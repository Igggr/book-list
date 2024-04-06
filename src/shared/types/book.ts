import { User } from "./user";

export type Book = {
    id: number;
    title: string;
    author: string;
    year: number;
    description: string;
    owner: User;
    deletedAt: Date;
}