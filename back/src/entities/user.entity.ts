/* eslint-disable prettier/prettier */
import { Role } from 'src/enum/role.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 50 })
  address: string;

  @Column({ length: 50 })
  phone: string;

  @Column({ default: Role.User })
  role: Role;

  @Column({
    default:
      'https://res.cloudinary.com/dc8tneepi/image/upload/ztbuutsulfhoarq63xsh.jpg',
  })
  image: string;
}
