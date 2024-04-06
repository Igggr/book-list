import { OmitType } from "@nestjs/swagger";
import { BookDTO } from "./addBookDto copy";

export class AddBookDTO extends OmitType(BookDTO, ['id']) {}
