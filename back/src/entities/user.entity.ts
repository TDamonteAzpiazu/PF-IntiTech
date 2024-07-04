/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, IsUUID } from 'class-validator';
import { Role } from 'src/enum/role.enum';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Cart } from './cart.entity';
import { Record } from './record.entity';


@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    description: 'The id of the user',
    example: '74a514f2-9c6c-4e72-a909-66aed6bfbd6f',
  })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @Column({ length: 50 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'mail@example.com',
  })
  @Column({ length: 50, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The hashed password of the user',
    example: '$2b$10$A59JWyTe0oDicM0iywzy9erbb9mi9.BsyXXGzbqbwQK3KAyw7BL06',
  })
  @Column()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The address of the user',
    example: 'Fake Street 123',
  })
  @Column({ length: 50 })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '123456789',
  })
  @Column({ length: 50 })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'user',
  })
  @Column({ default: Role.User })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @ApiProperty({
    description: 'The image of the user',
    example: 'https://res.cloudinary.com/dc8tneepi/image/upload/ztbuutsulfhoarq63xsh.jpg',
  })
  @Column({
    default:
      'https://res.cloudinary.com/dc8tneepi/image/upload/ztbuutsulfhoarq63xsh.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'The status of the user',
    example: 'active',
  })
  @Column({ default: 'pending' })
  @IsEnum(["active", "inactive", "pending"])
  status?: 'active' | 'inactive' | 'pending';

  @OneToMany(() => Record, (record) => record.user)
  records: Record[]

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

}
