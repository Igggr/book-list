import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserJwt } from "src/shared/types";
import { BookService } from "./book.service";

@Injectable()
export class OwnerGuard implements CanActivate {
    constructor(private readonly _bookService: BookService) { }
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user: UserJwt = request.user;
        const bookId = Number(request.params.id);
        const book = await this._bookService.findBookById(bookId);
        if (!book) {
            console.log('Such book does not exist');
            return false;
        }

        console.log(`User ${user.id} tried to modify book of ${book.owner.id} user`)

        return book.owner.id === user.id;
    }
}