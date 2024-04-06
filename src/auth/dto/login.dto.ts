import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { User } from "src/shared/types";

export class LoginDTO implements Pick<User, 'username' | 'password'> {
    @ApiProperty({example: 'Vasa'})
    username: string;

    @ApiProperty({ example: '1111' })
    password: string;
}