import { OmitType } from "@nestjs/swagger";
import { BookDTO } from "./bookDto";

export class AddBookDTO extends OmitType(BookDTO, ['id']) {}
