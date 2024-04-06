import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { User } from "src/shared/types";

export class LoginDTO implements Pick<User, 'username' | 'password'> {
    @IsNotEmpty()
    @ApiProperty({ example: 'Vasa' })
    username: string;

    @IsNotEmpty()
    @ApiProperty({ example: '1111' })
    password: string;
}