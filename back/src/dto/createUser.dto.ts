/* eslint-disable prettier/prettier */

import { Role } from 'src/enum/role.enum';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  country: string;
  role: Role;
  image: string;
}

