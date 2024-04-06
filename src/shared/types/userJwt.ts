import { User } from "./user";

export type UserJwt = Pick<User, 'id' | 'username' | 'email'>;
