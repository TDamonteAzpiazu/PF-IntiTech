import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
    @ApiProperty({ example: 'Login successful' })
    message: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyNWE2NzM5LWU5NDctNDZmYi1iNTZiLTNjMzJlNWVmNzM5MyIsImVtYWlsIjoicGFibG9AZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTk2Njg2MTF9.5tR0YIEHemRixPwh4dN0Tbe_fOltqH2R68ZKIKvGayg' })
    token: string;
}