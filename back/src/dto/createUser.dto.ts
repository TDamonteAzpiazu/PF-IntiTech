/* eslint-disable prettier/prettier */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

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
  
  @ApiProperty({
    description: 'The address of the user',
    example: 'Fake Street 123',
  })
  address: string;
  
  @ApiProperty({
    description: 'The phone of the user',
    example: '123456789',
  })
  phone: string;
  
  @ApiPropertyOptional({
    description: 'The image of the user'
  })
  @IsOptional()
  image?: string;
  
  @ApiProperty({
    description: 'The role of the user',
    example: 'user',
  })
  role: Role;
}
