import { ApiProperty } from "@nestjs/swagger";

export class AccessToken {
    @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJib2IzIiwiZW1haWwiOiJib2IzQG1haWwuY29tIiwiaWF0IjoxNzEyNDA2ODAxLCJleHAiOjE3MTMwMTE2MDF9.cdL2YAsgNLeqr5PqQv9VY72WqyjkQUtM5SO_Y7dIKeM" })
    accessToken: string;
}