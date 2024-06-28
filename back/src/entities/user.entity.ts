/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/enum/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    description: 'The id of the user',
    example: '74a514f2-9c6c-4e72-a909-66aed6bfbd6f',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @Column({ length: 50 })
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'mail@example.com',
  })
  @Column({ length: 50, unique: true })
  email: string;

  @ApiProperty({
    description: 'The hashed password of the user',
    example: '$2b$10$A59JWyTe0oDicM0iywzy9erbb9mi9.BsyXXGzbqbwQK3KAyw7BL06',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'The address of the user',
    example: 'Fake Street 123',
  })
  @Column({ length: 50 })
  address: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '123456789',
  })
  @Column({ length: 50 })
  phone: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'user',
  })
  @Column({ default: Role.User })
  role: Role;

  @ApiProperty({
    description: 'The image of the user',
    example: 'https://res.cloudinary.com/dc8tneepi/image/upload/ztbuutsulfhoarq63xsh.jpg',
  })
  @Column({
    default:
      'https://res.cloudinary.com/dc8tneepi/image/upload/ztbuutsulfhoarq63xsh.jpg',
  })
  image: string;

  @ApiProperty({
    description: 'The status of the user',
    example: 'active',
  })
  @Column()
  status: 'active' | 'inactive' | 'pending';
}
