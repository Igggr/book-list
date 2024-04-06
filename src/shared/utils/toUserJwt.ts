import { User, UserJwt } from "../types"

export const toUserJwt = ({id, username, email}: User): UserJwt => ({
    id, username, email
})