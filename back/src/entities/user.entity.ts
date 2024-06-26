/* eslint-disable prettier/prettier */
import { Role } from 'src/enum/role.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50 })
  name: string = uuid();

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 50 })
  password: string;

  @Column({ length: 50 })
  address: string;

  @Column({ length: 50 })
  phone: string;

  @Column({ length: 50 })
  country: string;

  @Column({ default: Role.User })
  role: Role;

  @Column({default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqVg_URh9Mvrm3NYaTlCUyiM7r382ohELc1g&s"})
  image: string;
}
