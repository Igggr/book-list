import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { RegisterDto } from "src/shared/types";

export class RegisterDTO implements RegisterDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'Vasa' })
    username: string;

    @IsEmail()
    @ApiProperty({example: "vasa@mail.com"})
    email: string;

    @IsNotEmpty()
    @Length(4, 40)
    @ApiProperty({example: '1111'})
    password: string;
}