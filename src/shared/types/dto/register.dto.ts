import { User } from "../user";

export type RegisterDto = Pick<User, 'username' | 'email' | 'password'>;