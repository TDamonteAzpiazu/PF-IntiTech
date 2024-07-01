import { ApiProperty } from "@nestjs/swagger";

export class CredentialsDto {
    @ApiProperty({
        description: 'The email of the user',
        example: 'mail@example.com',
    })
    email: string;
    
    @ApiProperty({
        description: 'The password of the user',
        example: 'Password1!',
    })
    password: string;
}