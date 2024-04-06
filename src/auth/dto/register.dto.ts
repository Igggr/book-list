import { ApiProperty } from "@nestjs/swagger";
import { RegisterDto } from "src/shared/types";

export class RegisterDTO implements RegisterDto {
    @ApiProperty({example: 'Vasa'})
    username: string;

    @ApiProperty({example: "vasa@mail.com"})
    email: string;

    @ApiProperty({example: '1111'})
    password: string;
}